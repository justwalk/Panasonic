#include "output.h"

#include "json.h"

#define NO_FCGI_DEFINES

#include <fcgi_stdio.h>

static const JSON::String done("done");

void printHeaders() {
	FCGI_fprintf(FCGI_stdout, "X-FCGI: %d\n", !FCGX_IsCGI());
	FCGI_fputs("Content-Type: application/json\n\n", FCGI_stdout);
}

void printHeaders(const char* status) {
	FCGI_fprintf(FCGI_stdout, "X-FCGI: %d\n", !FCGX_IsCGI());
	FCGI_fprintf(FCGI_stdout, "Content-Type: application/json\n%s\n\n", status);
}

void printDone() {
	printHeaders();
	done.render();
}

void printID(ULONG ID) {
	printHeaders();
	JSON::Object obj;
	obj.add(new JSON::String("ID"), new JSON::Integer(ID));
	obj.render();
}

void printHomeData(ULONG ID) {
	printHeaders();
	JSON::Object obj;
	obj.add(new JSON::String("ID"), new JSON::Integer(ID));
	obj.add(new JSON::String("homeData"), new JSON::String("test"));
	obj.render();
}

void writeLog(const char* log){
	FILE *fp;
	if((fp=fopen("log/my.txt","a+"))==NULL){
		printf(fp,"%s\n",log );
	}
	fprintf(fp, "%s\n", log);
	fclose(fp);
}