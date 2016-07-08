#include "login.h"

#include "error.h"

bool login(){
	if(!(Initeblib())) {
		die("Could not initialize library");
		return false;
	}

	CHAR loginDataFile[MAX_PATH];
	GetModuleFileName(NULL, loginDataFile, MAX_PATH);
	int pos = strlen(loginDataFile)-1;
	while(loginDataFile[pos] != '\\')
		pos--;
	loginDataFile[pos] = 0;
	strcat(loginDataFile, "\\bootmgr.ip");

	FILE* loginData = fopen(loginDataFile, "rt");
	
	if(!loginData){
		loginDataFile[pos] = 0;
		strcat(loginDataFile, "\\backup");
		strcat(loginDataFile, "\\bootmgr.ip");
		
		loginData = fopen(loginDataFile, "rt");
	}
	
	if(!loginData){
		die(strerror(errno));
		return false;
	}

	CHAR pwszIp[MAX_IP];
	CHAR pwszPort[8];
	CHAR pwszUser[MAX_NAME];
	CHAR pwszPassword[MAX_NAME];
	
	int port;

	if(!fgets(pwszIp,MAX_IP,loginData)) {
		die("Missing IP in bootmgr.ip");
		return false;
	}
	pwszIp[strlen(pwszIp) - 1] = 0;
	if(!fgets(pwszPort,8,loginData)) {
		die("Missing Port in bootmgr.ip");
		return false;
	}
	if(sscanf(pwszPort, "%d", &port) != 1) {
		die("Port must be an integer");
		return false;
	}
	if(!fgets(pwszUser,MAX_NAME,loginData)) {
		die("Missing User in bootmgr.ip");
		return false;
	}
	pwszUser[strlen(pwszUser) - 1] = 0;
	if(!fgets(pwszPassword,MAX_NAME,loginData)) {
		die("Missing Password in bootmgr.ip");
		return false;
	}
	if(pwszPassword[strlen(pwszPassword) - 1] == '\n')
		pwszPassword[strlen(pwszPassword) - 1] = 0;

	if(!(Login(pwszIp, port, pwszUser, pwszPassword))) {
		die("Could not login to management server");
		return false;
	}
	
	return true;
}

void logout(){
	/* nothing to do? */
	Releaseeblib();
}