#include "error.h"
#include "route.h"
#include "output.h"

#include "group.h"
#include "computer.h"
#include "ioserver.h"
#include "alive.h"
#include "diag.h"
#include "home.h"
#include "login.h"
#include "settings.h"
#include "alive.h"

class CGIResource : public Route::SubResource{
public:
	void virtual run(const std::map<std::string, std::string>& params) const;

	CGIResource(){
		prefix = "/";
		children.push_back(new GroupResource());
		children.push_back(new IOServerResource());
		children.push_back(new ComputerResource());
		children.push_back(new SettingsResource());
		children.push_back(new AliveResource());
		children.push_back(new TestResource());
		children.push_back(new HomeResource());
	}
};

void CGIResource::run(const std::map<std::string, std::string>& params) const{
	notFound("/");
}

char **FCGI_environ;
extern char **environ;

int main(){
#ifdef LOGGING
	freopen("C:\\NKV\\log.txt", "wt", stderr);
#endif

	log("Starting app");
	
	int isCGI = FCGX_IsCGI();
	
	if(isCGI) {
		log("Received request as CGI");
		
		if(!login())
			return 1;
		
		log("Login complete");
	
		FCGI_stdin->stdio_stream = stdin;
        FCGI_stdin->fcgx_stream = NULL;
        FCGI_stdout->stdio_stream = stdout;
        FCGI_stdout->fcgx_stream = NULL;
        FCGI_stderr->stdio_stream = stderr;
        FCGI_stderr->fcgx_stream = NULL;
		FCGI_environ = environ;
	} else {
		FCGX_Stream *in, *out, *error;
		bool first = true;
		
		while(FCGX_Accept(&in, &out, &error, &FCGI_environ) >= 0) {
			log("Received request");
			
			if(first) {
				if(!login())
					return 1;
				first = false;
			}
			
			FCGI_stdin->stdio_stream = NULL;
			FCGI_stdin->fcgx_stream = in;
			FCGI_stdout->stdio_stream = NULL;
			FCGI_stdout->fcgx_stream = out;
			//FCGI_stderr->stdio_stream = NULL;
			//FCGI_stderr->fcgx_stream = error;
			
			FCGI_stderr->stdio_stream = stderr;
			FCGI_stderr->fcgx_stream = NULL;
		
			CGIResource r;

			if(FCGX_GetParam("PATH_INFO", FCGI_environ) == NULL)
				die("Missing PATH_INFO");
			else if(!r.locate(Route::Path(FCGX_GetParam("PATH_INFO", FCGI_environ))))
				notFound(FCGX_GetParam("PATH_INFO", FCGI_environ));
			
			log("Completed request");
		}
	}
	log("Stopping app");
	
	logout();
	
	fputs("Logout complete" ,stderr);
	return 0;
}
