#include "route.h"

#include "vhd.h"

#include <cstdlib>

#include <boost/algorithm/string/predicate.hpp>

#include "error.h"

extern char **FCGI_environ;

namespace Route{

	void Resource::run(const std::map<std::string, std::string>& params) const{
		die("Not implemented");
	}

	Resource::~Resource(){
		std::vector<Resource*>::iterator it;
		for(it = children.begin(); it != children.end(); it++)
			delete *it;
	}

	bool SubResource::locate(Path p) const{
		if(p.query >= p.path.size()){
			return false;
		}
		else{
			if(p.path.compare(p.query, prefix.size(), prefix))
				return false;
			p.query = p.query + prefix.size();
			if(p.path[p.query] == '/')
				p.query++;
			if(p.query >= p.path.size()){
				std::map<std::string, std::string> gparam = Route::getParams();
				p.parameters.insert(gparam.begin(),gparam.end());
				run(p.parameters);
				return true;
			}

			std::vector<Resource*>::const_iterator it;
			for(it = children.begin(); it != children.end(); it++)
				if((*it)->locate(p))
					return true;

			return false;
		}
	}
	
	ParameterResource::ParameterResource() : validator(NULL) {}

	bool ParameterResource::locate(Path p) const{
		if(p.query >= p.path.size()){
			return false;
		}
		else{
			size_t end = p.path.find('/', p.query);
			std::string value = p.path.substr(p.query, end - p.query);
			
			if(validator != NULL)
				if(!boost::regex_match(value, *validator))
					invalidParameter(param.c_str());
			
			p.parameters[param] = value;
			p.query = end;
			if(std::string::npos != p.query)
				p.query ++;
			if(p.query >= p.path.size()){
				std::map<std::string, std::string> gparam = Route::getParams();
				p.parameters.insert(gparam.begin(),gparam.end());
				run(p.parameters);
				return true;
			}
			else
				return SubResource::locate(p);
		}
	}

	void decodeUrl(CHAR* wdata, CHAR* data){
		char* tdata = new char[strlen(data) + 1];
		int i,k=0;
		for(i=0;i<strlen(data);i++)
			if(data[i]!='%')
				if(data[i]!='+')
					tdata[k++] = data[i];
				else
					tdata[k++] = ' ';
			else{
				i++;

				if(data[i] >= '0' && data[i] <='9')
					tdata[k] = 16*(data[i]-'0');
				else if(data[i] >= 'A' && data[i] <='F')
					tdata[k] = 16*(data[i]-'A' + 10);
				else {
					die("Invalid character in escape sequence");
					exit(1);
				}

				i++;

				if(data[i] >= '0' && data[i] <='9')
					tdata[k] += (data[i]-'0');
				else if(data[i] >= 'A' && data[i] <='F')
					tdata[k] += (data[i]-'A' + 10);
				else {
					die("Invalid character in escape sequence");
					exit(1);
				}

				k++;
			}
		tdata[k] = 0;
		strcpy(wdata, tdata);
		delete[] tdata;
	}

	std::map<std::string, std::string> getParams(){
		std::map<std::string, std::string> params;
		char* tmp = FCGX_GetParam("QUERY_STRING", FCGI_environ);
		if(tmp == NULL) {
			die("Missing QUERY_STRING");
			exit(1);
		}
		if(!tmp)
			tmp = "";
		char* space = new char[strlen(tmp)+1];
		CHAR* wdata1 = new CHAR[strlen(tmp)+1];
		CHAR* wdata2 = new CHAR[strlen(tmp)+1];
		strcpy(space,tmp);

		char* query = space;

		while(tmp = strchr(query,'&')){
			*tmp = NULL;
			{
				char* tmp = strchr(query, '=');
				if(!tmp)
					break;
				*tmp = NULL;
				tmp++;
				decodeUrl(wdata1, query);
				decodeUrl(wdata2, tmp);
				params[wdata1] = wdata2;
			}
			query = tmp+1;
		}

		tmp = strchr(query, '=');
		if(!tmp)
			goto post;
		*tmp = NULL;
		tmp++;
		decodeUrl(wdata1, query);
		decodeUrl(wdata2, tmp);
		params[wdata1] = wdata2;

		post:
		delete[] space;
		delete[] wdata1;
		delete[] wdata2;
		
		if(FCGX_GetParam("REQUEST_METHOD", FCGI_environ) == NULL) {
			die("Missing REQUEST_METHOD");
			exit(1);
		}

		if(strcmp(FCGX_GetParam("REQUEST_METHOD", FCGI_environ), "POST") == 0){
			int len;
			
			if(FCGX_GetParam("CONTENT_LENGTH", FCGI_environ) == NULL) {
				die("Missing CONTENT_LENGTH");
				exit(1);
			}
			
			sscanf(FCGX_GetParam("CONTENT_LENGTH", FCGI_environ), "%d", &len);

			char* data = new char[len + 3];
			FCGI_fgets(data, len + 1, FCGI_stdin);
			wdata1 = new CHAR[len+1];
			wdata2 = new CHAR[len+1];

			query = data;

			while(tmp = strchr(query,'&')){
				*tmp = NULL;
				{
					char* tmp = strchr(query, '=');
					if(!tmp)
						break;
					*tmp = NULL;
					tmp++;
					decodeUrl(wdata1, query);
					decodeUrl(wdata2, tmp);
					params[wdata1] = wdata2;
				}
				query = tmp+1;
			}

			tmp = strchr(query, '=');
			if(!tmp)
				return params;
			*tmp = NULL;
			tmp++;

			decodeUrl(wdata1, query);
			decodeUrl(wdata2, tmp);
			params[wdata1] = wdata2;

			delete data;
			delete wdata1;
			delete wdata2;
		}

		return params;
	}
}
