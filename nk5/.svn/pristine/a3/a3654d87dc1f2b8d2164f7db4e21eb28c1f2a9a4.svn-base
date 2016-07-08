#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int main(int argc, char** argv){
	if(argc<2)
		exit(1);
	char fname[255];
	char line[2048];
	char* ps;
	int returnCode = 0;

	sprintf(fname,"%s.tdep",argv[1]);
	FILE* in = fopen(fname, "rt");
	sprintf(fname,"%s.dep",argv[1]);
	FILE* out = fopen(fname, "wt");

	if(!in || !out)
		exit(2);

	fgets(line,1024,in);
	if(!feof(in))
		line[strlen(line)-5]=0;
	fprintf(out,"%s.obj: ", line);
	printf("%s.cpp\n", line);

	while(!feof(in)){
		if(fgets(line,1024,in) == NULL)
			break;
		if(memcmp(line, "Note: including file:",sizeof("Note: including file:") - 1) != 0){
			fputs(line,stdout);
			returnCode = 1;
		}
		else{
			ps = line + sizeof("Note: including file:") - 1;
			while(*ps == ' ')
				ps++;
			if(!feof(in))
				ps[strlen(ps)-1]=0;
			fprintf(out, "\"%s\" ",ps);
		}
	}
	fprintf(out, "\n");
	fclose(in);
	fclose(out);
	sprintf(fname,"%s.tdep",argv[1]);
	unlink(fname);
	return returnCode;
}
