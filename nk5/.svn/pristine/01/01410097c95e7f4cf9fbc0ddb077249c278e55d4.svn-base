#ifndef ROUTE_H
#define ROUTE_H

#include <map>
#include <string>
#include <vector>

#include <boost/regex.hpp>

namespace Route{

	struct Path{
			Path(const Path& from){
				this->parameters = from.parameters;
				this->query = from.query;
				this->path = from.path;
			}
			Path(const std::string& from){
				this->query = 0;
				this->path = from;
			}

			size_t query;
			std::string path;
			std::map<std::string, std::string> parameters;
	};

	class Resource{
	public:
		void virtual run(const std::map<std::string, std::string>& params) const;
		bool virtual locate(Path) const =0;
		virtual ~Resource();
	protected:
		std::vector<Resource*> children;
	};

	class SubResource : public Resource{
	public:
		bool virtual locate(Path) const;
	protected:
		std::string prefix;
		
	};

	class ParameterResource: public SubResource{
	public:
		ParameterResource();
		bool virtual locate(Path) const;
	protected:
		std::string param;
		const boost::regex* validator;
	};

	std::map<std::string, std::string> getParams();
}

#endif
