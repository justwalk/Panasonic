#include "file.h"

#include <iostream>
#include <sstream>
#include <string>

#include "output.h"

FileResource::FileResource(){
	prefix = "files";
}

void FileResource::run(const std::map<std::string, std::string>& params) const{
	CHECK_PARAM("Path");
	JSON::Value* data = FileEnumToJSON(GetInt(iid), params.find("Path")->second.c_str());

	printHeaders();
	data->render();

	delete data;
}

JSON::Array* FileEnumToJSON(ULONG iid, const char* path){
	ENUM_HANDLE EnumObj = GetFirstFileFromIOSrv(iid, path);
	
	return enumToJSON<GET_FILE_OBJ, FileToJSON, GetNextFileFromIOSrv>(EnumObj);
}

JSON::Value* FileToJSON(const GET_FILE_OBJ& info) {
	JSON::Object* data = new JSON::Object();

	data->add(new JSON::String("Name"), new JSON::String(info.pchPath));
	
	return data;
}