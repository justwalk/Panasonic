#include "diag.h"

#define NO_FCGI_DEFINES

#include <fcgi_stdio.h>

#include "output.h"

#include <Windows.h>

extern char **FCGI_environ;

TestResource::TestResource(){
	prefix = "test";
}

std::string getIps();

void TestResource::run(const std::map<std::string, std::string>& params) const{
	printHeaders();

	FCGI_fputs("\n\nEnvironment\n\n", FCGI_stdout);

	int i = 0;
	char *s = *FCGI_environ;

	for (; s; i++) {
		FCGI_printf("%s\n", s);
		s = *(FCGI_environ+i);
	}

	FCGI_fputs("\n\nParameters\n\n", FCGI_stdout);

	std::map<std::string, std::string>::const_iterator it;
	for(it = params.begin(); it != params.end(); it++) {
		FCGI_fputs(it->first.c_str(), FCGI_stdout);
		FCGI_fputs(": ", FCGI_stdout);
		FCGI_fputs(it->second.c_str(), FCGI_stdout);
		FCGI_fputs("\n", FCGI_stdout);
	}

	std::string ips = getIps();
	FCGI_fputs("\n\nIPs\n\n", FCGI_stdout);

	FCGI_fputs(ips.c_str(), FCGI_stdout);
}
