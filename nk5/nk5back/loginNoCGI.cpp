#include "login.h"

void error(CHAR* msg){
	printf("%s\n", msg);
	exit(1);
}

bool login(){
	if(!(Initeblib()))
		error("Could not initialize library");

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
		error(strerror(errno));
	}

	CHAR pwszIp[MAX_IP];
	CHAR pwszPort[8];
	CHAR pwszUser[MAX_NAME];
	CHAR pwszPassword[MAX_NAME];
	
	int port;

	if(!fgets(pwszIp,MAX_IP,loginData))
		error("Missing IP in bootmgr.ip");
	pwszIp[strlen(pwszIp) - 1] = 0;
	if(!fgets(pwszPort,8,loginData))
		error("Missing Port in bootmgr.ip");
	if(sscanf(pwszPort, "%d", &port) != 1)
		error("Port must be an integer");
	if(!fgets(pwszUser,MAX_NAME,loginData))
		error("Missing User in bootmgr.ip");
	pwszUser[strlen(pwszUser) - 1] = 0;
	if(!fgets(pwszPassword,MAX_NAME,loginData))
		error("Missing Password in bootmgr.ip");
	if(pwszPassword[strlen(pwszPassword) - 1] == '\n')
		pwszPassword[strlen(pwszPassword) - 1] = 0;

	if(!(Login(pwszIp, port, pwszUser, pwszPassword)))
		error("Could not login to management server");
	
	return true;
}

void logout(){
	/* nothing to do? */
	Releaseeblib();
}