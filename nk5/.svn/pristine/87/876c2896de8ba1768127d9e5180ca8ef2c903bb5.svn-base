#include "error.h"
#include "json.h"
#include "output.h"

#include <iostream>

#include <cstdlib>

void log(char* msg) {
#ifdef LOGGING
	fputs(msg, stderr);
	fputs("\n", stderr);
	fflush(stderr);
#endif
}

extern char **FCGI_environ;

void close() {
	FCGX_Finish();

	FCGI_environ = NULL;
	FCGI_stdin->fcgx_stream = NULL;
    FCGI_stdout->fcgx_stream = NULL;
    FCGI_stderr->fcgx_stream = NULL;
}

void die(const CHAR* msg){
	printHeaders("Status: 500 Internal Server Error");
	JSON::Object obj;
	obj.add(new JSON::String("error"), new JSON::String(msg));
	obj.render();
	close();
}

void die(){
	die("Unexpected error");
}

void WinDie(CHAR* lpszFunction){
	LPVOID lpMsgBuf;
	LPVOID lpDisplayBuf;
	DWORD dw = GetLastError();

	FormatMessage(
		FORMAT_MESSAGE_ALLOCATE_BUFFER |
		FORMAT_MESSAGE_FROM_SYSTEM |
		FORMAT_MESSAGE_IGNORE_INSERTS,
		NULL,
		dw,
		MAKELANGID(LANG_NEUTRAL, SUBLANG_DEFAULT),
		(LPTSTR) &lpMsgBuf,
		0, NULL );
				
	printHeaders("Status: 500 Internal Server Error");
	JSON::Object obj;
	obj.add(new JSON::String("error"), new JSON::String("Windows function failed"));
	obj.add(new JSON::String("function"), new JSON::String((char*)lpszFunction));
	obj.add(new JSON::String("code"), new JSON::String((char*)lpMsgBuf));
	obj.render();

	LocalFree(lpMsgBuf);
	close();
}

void notFound(CHAR* url){
	printHeaders("Status: 404 Not Found");
	JSON::Object obj;
	obj.add(new JSON::String("url"), new JSON::String(url));
	obj.render();
	close();
}

void missingParameter(const CHAR* param){
	printHeaders("Status: 404 Not Found");
	JSON::Object obj;
	obj.add(new JSON::String("error"), new JSON::String("Missing parameter"));
	obj.add(new JSON::String("parameter"), new JSON::String(param));
	obj.render();
	close();
}

void invalidParameter(const CHAR* param){
	printHeaders("Status: 404 Not Found");
	JSON::Object obj;
	obj.add(new JSON::String("error"), new JSON::String("Invalid parameter"));
	obj.add(new JSON::String("parameter"), new JSON::String(param));
	obj.render();
	close();
}

void SDKError(CHAR* lpszFunction, ULONG code){
	printHeaders("Status: 500 Internal Server Error");
	JSON::Object obj;
	obj.add(new JSON::String("error"), new JSON::String("SDK Error"));
	obj.add(new JSON::String("function"), new JSON::String(lpszFunction));
	obj.add(new JSON::String("code"), new JSON::String(errorToString(code)));
	obj.render();
	close();
}
