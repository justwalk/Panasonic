#include "vhd.h"

#include "login.h"

int main(int argc, char** argv) {
	if(argc != 2){
		printf("Usage: restore <file>");
		return 1;
	}

	login();

	if(!ImportDatabaseFile(argv[1]))
		printf("Restore failed");

	logout();
	return 0;
}