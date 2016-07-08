#include "vhd.h"

#include "login.h"

int main(int argc, char** argv) {
	if(argc != 2){
		printf("Usage: backup <file>");
		return 1;
	}

	login();

	if(!ExportDatabaseFile(argv[1]))
		printf("Backup failed");

	logout();
	return 0;
}