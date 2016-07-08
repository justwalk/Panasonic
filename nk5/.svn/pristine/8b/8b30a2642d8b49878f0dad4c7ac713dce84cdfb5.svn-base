#include "directory.h"

#include <iostream>
#include <sstream>
#include <string>

#include "bitmap.h"
#include "output.h"

const EnumMap<DIRECTORY_TYPE> DIRECTORY_TYPE_MAP;

DirectoryResource::DirectoryResource(){
	prefix = "directories";
	
	children.push_back(new CreateDirectoryResource());
	children.push_back(new UUIDDirectoryResource());
}

void DirectoryResource::run(const std::map<std::string, std::string>& params) const{
	CHECK_PARAM("Type");
	if(!DIRECTORY_TYPE_MAP.exists(params.find("Type")->second))
			invalidParameter("Type");
			
	ULONG type = DIRECTORY_TYPE_MAP.toBit(params.find("Type")->second);
	
	JSON::Value* data = DirectoryEnumToJSON(GetInt(iid), type);

	printHeaders();
	data->render();

	delete data;
}

UUIDDirectoryResource::UUIDDirectoryResource(){
	param = "did";
	validator = &numberRegex;
	
	children.push_back(new UpdateDirectoryResource());
	children.push_back(new DeleteDirectoryResource());
}

void UUIDDirectoryResource::run(const std::map<std::string, std::string>& params) const{
	die("Not implemented");
}

void UpdateDirectoryResource::run(const std::map<std::string, std::string>& params) const{
	CHECK_PARAM("Path");

	ULONG error;
	if(!(EditDirectory(GetInt(did), params.find("Path")->second.c_str(), &error)))
		return SDKError("EditDirectory", error);
		
	printDone();
}

UpdateDirectoryResource::UpdateDirectoryResource(){
	prefix = "update";
}

void DeleteDirectoryResource::run(const std::map<std::string, std::string>& params) const{
	ULONG error;
	if(!(DelDirectory(GetInt(did), &error)))
		return SDKError("DelDirectory", error);
		
	printDone();
}

DeleteDirectoryResource::DeleteDirectoryResource(){
	prefix = "delete";
}

void CreateDirectoryResource::run(const std::map<std::string, std::string>& params) const{
	CHECK_PARAM("Type");
	if(!DIRECTORY_TYPE_MAP.exists(params.find("Type")->second))
			invalidParameter("Type");
	
	ADD_DIR_OBJ info;
	
	info.nType = DIRECTORY_TYPE_MAP.toBit(params.find("Type")->second);
	CopyString(pchPath, "Path");
	info.nSrvID = GetInt(iid);
	
	ULONG error, nid;
	if(!(AddDirectory(&info, &nid, &error)))
		return SDKError("AddDirectory", error);

	printID(nid);
}

CreateDirectoryResource::CreateDirectoryResource(){
	prefix = "create";
}

JSON::Array* DirectoryEnumToJSON(ULONG iid, ULONG type){
	ENUM_HANDLE EnumObj = GetFirstDirectory(type, iid);
	
	return enumToJSON<DIR_OBJ, DirectoryToJSON, GetNextDirectory>(EnumObj);
}

JSON::Value* DirectoryToJSON(const DIR_OBJ& info) {
	JSON::Object* data = new JSON::Object();

	data->add(new JSON::String("ID"), new JSON::Integer(info.nID));
	data->add(new JSON::String("Type"), new JSON::String(DIRECTORY_TYPE_MAP.toString(info.nType)));
	data->add(new JSON::String("Path"), new JSON::String(info.pchPath));
	data->add(new JSON::String("Server"), new JSON::Integer(info.nSrvID));
	
	return data;
}