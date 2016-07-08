#include "disk.h"

#include <iostream>

#include "login.h"
#include "output.h"

#include "basedisk.h"

DiskResource::DiskResource(){
	prefix="disks";
	children.push_back(new CreateDiskResource);
	children.push_back(new UUIDDiskResource);
}

void DiskResource::run(const std::map<std::string, std::string>& params) const{
	JSON::Value* data = DiskEnumToJSON(GetInt(pid));

	printHeaders();
	data->render();

	delete data;
}

UUIDDiskResource::UUIDDiskResource(){
	param="did";
	validator=&numberRegex;
	children.push_back(new DeleteDiskResource);
	children.push_back(new UpdateDiskResource);
}

void UUIDDiskResource::run(const std::map<std::string, std::string>& params) const{
	DISK_INFO_OBJ info;
	
	ULONG error;
	if(!(GetSpecifiedDisk(GetInt(did), &info, &error)))
		return SDKError("GetSpecifiedDisk", error);

	JSON::Value* data = DiskToJSON(info);

	printHeaders();
	data->render();

	delete data;
}

DeleteDiskResource::DeleteDiskResource(){
	prefix = "delete";
}

void DeleteDiskResource::run(const std::map<std::string, std::string>& params) const{
	deleteDisk(GetInt(did));

	printDone();
}

UpdateDiskResource::UpdateDiskResource(){
	prefix = "update";
}

void UpdateDiskResource::run(const std::map<std::string, std::string>& params) const{
	CHECK_PARAM("Name");
	
	ULONG error;
	if(!(EditExportDisk(GetInt(did), params.find("Name")->second.c_str(), &error)))
		return SDKError("EditExportDisk", error);
	
	printDone();
}

CreateDiskResource::CreateDiskResource(){
	prefix = "create";
}

void CreateDiskResource::run(const std::map<std::string, std::string>& params) const{
	ADD_EXPORT_DISK info;
	
	DISK_INFO_OBJ baseDisk;
	
	CopyInteger(nPID, "BaseDisk");
	info.nPackID = GetInt(pid);
	
	ULONG error;
	if(!GetSpecifiedDisk(info.nPID, &baseDisk, &error))
		return SDKError("GetSpecifiedDisk", error);
	
	info.nSrvID = baseDisk.nSrvID;
	info.nType = DISK_TYPE_EXPORT;
	info.nSizeMb = baseDisk.nSizeMb;
	strcpy_s(info.pchName, sizeof(info.pchName), baseDisk.pchName);
	
	ULONG nid;

	if(!AddExportDiskToPack(&info, &nid, &error))
		return SDKError("AddExportDiskToPack", error);
	
	printID(nid);
}

void deleteDisk(ULONG did){
	ULONG error;
	if(!(DelExportDisk(did, &error)))
		return SDKError("DelExportDisk", error);
}

JSON::Array* DiskEnumToJSON(ULONG pid){
	ENUM_HANDLE EnumObj = GetFirstExportDisk(pid);
		
	return enumToJSON<DISK_INFO_OBJ, DiskToJSON, GetNextExportDisk>(EnumObj);
}
