#include "ioserver.h"

#include <iostream>
#include <sstream>

#include "login.h"
#include "output.h"

#include "basedisk.h"
#include "directory.h"
#include "file.h"
#include "menu.h"
IOServerResource::IOServerResource(){
	prefix = "ioservers";
	children.push_back(new ServerScript());
	children.push_back(new GetIOServerAboutInfoResource());
	children.push_back(new CreateIOServerResource());
	children.push_back(new RestartBOOTServerResource());
	children.push_back(new UUIDIOServerResource());

}

void IOServerResource::run(const std::map<std::string, std::string>& params) const{
	JSON::Value* data = IOServerEnumToJSON();

	printHeaders();
	data->render();

	delete data;
}


//xiongpanan add start 2016/4/18
GetIOServerAboutInfoResource::GetIOServerAboutInfoResource(){
	prefix = "aboutInfo";
}
void GetIOServerAboutInfoResource::run(const std::map<std::string, std::string>& params) const{
	JSON::Value* data = GetIOServerAboutInfoToJSON();

	
	if(data == NULL) return;
	
	printHeaders();
	data->render();

	//delete data;

}

JSON::Object* GetIOServerAboutInfoToJSON(){
	JSON::Object* data = new JSON::Object();
 	ABOUT_INFO_OBJ  info;
 	ULONG error;
	if (GetAboutInfo(&info,&error)){
        data->add(new JSON::String("LicenseType"), new JSON::Integer(info.nLicenseType));
        data->add(new JSON::String("ClientCount"), new JSON::Integer(info.nClientCount));
        data->add(new JSON::String("ErrorCode"), new JSON::Integer(info.nErrorCode));
        data->add(new JSON::String("SerialNo"), new JSON::String(info.pchSerialNo));
        data->add(new JSON::String("TrialDaysLeft"), new JSON::Integer(info.Trial.nDaysLeft));
        data->add(new JSON::String("pchName"), new JSON::String(info.Registed.pchName));
        data->add(new JSON::String("pchCompName"), new JSON::String(info.Registed.pchCompName));
        data->add(new JSON::String("TimeLimitDaysLeft"), new JSON::Integer(info.Registed.TimeLimit.nDaysLeft));
       
     }
	return data;
}
//xiongpanan add end 2016/4/18


UUIDIOServerResource::UUIDIOServerResource(){
	param = "iid";
	validator = &numberRegex;
	children.push_back(new UpdateIOServerResource());
	children.push_back(new DeleteIOServerResource());
	children.push_back(new RestartIOServerResource());
	children.push_back(new StopIOServerResource());
	children.push_back(new IOServerChannelResource());
	children.push_back(new BaseDiskResource());
	children.push_back(new DirectoryResource());
	children.push_back(new FileResource());
	children.push_back(new MenuResource());
}

void UUIDIOServerResource::run(const std::map<std::string, std::string>& params) const{
	die("Not supported");
}

UpdateIOServerResource::UpdateIOServerResource(){
	prefix = "update";
}

void UpdateIOServerResource::run(const std::map<std::string, std::string>& params) const{
	ULONG id;

	std::istringstream(params.find("iid")->second) >> id;

	ADD_IOSRV_OBJ info;

	CopyString(pchAddr4, "IP");
	CopyInteger(nPort4, "Port");

	CHECK_PARAM("Type");
	if(params.find("Type")->second == "Primary")
		info.nType = 0;
	else if(params.find("Type")->second == "Secondary")
		info.nType = 1;
	else
		invalidParameter("Type");

	ULONG error;
	if(!(DelIOServer(id, &error)))
		return SDKError("DelIOServer", error);

	ULONG nid;
	if(!(AddIOServer(&info, &nid, &error)))
		return SDKError("AddIOServer", error);

	printID(nid);

//	ADD_DIR_OBJ addDir;
//	//add Directory *********** 1
//	addDir.nType =0;
//	//CopyString(pchPath, "base");
//	strcpy(addDir.pchPath, clamp(params.find("base")->second, sizeof(addDir.pchPath)).c_str());
//	addDir.nSrvID =nid;
//	ULONG nOudId;
//	if(!(AddDirectory(&addDir, &nOudId,&error)))
//		return SDKError("AddDirectory", error);
//
//	//add Directory  ************ 2
//	addDir.nType =1;
//	strcpy(addDir.pchPath, clamp(params.find("export")->second, sizeof(addDir.pchPath)).c_str());
//	addDir.nSrvID =nid;
//	if(!(AddDirectory(&addDir, &nOudId,&error)))
//		return SDKError("AddDirectory", error);
//
//	//add Directory  ************** 3
//	addDir.nType =2;
//	strcpy(addDir.pchPath, clamp(params.find("storage")->second, sizeof(addDir.pchPath)).c_str());
//	addDir.nSrvID =nid;
//	if(!(AddDirectory(&addDir, &nOudId,&error)))
//		return SDKError("AddDirectory", error);

//	printID(nOudId);

}

DeleteIOServerResource::DeleteIOServerResource(){
	prefix = "delete";
}

void DeleteIOServerResource::run(const std::map<std::string, std::string>& params) const{
	ULONG id;

	std::istringstream(params.find("iid")->second) >> id;

	ULONG error;
	if(!(DelIOServer(id, &error)))
		return SDKError("DelIOServer", error);

	printDone();
}

RestartIOServerResource::RestartIOServerResource(){
	prefix = "restart";
}

void RestartIOServerResource::run(const std::map<std::string, std::string>& params) const{
	ULONG id;

	std::istringstream(params.find("iid")->second) >> id;

	ULONG error;
	if(!(RebootIOServer(id, &error)))
		return SDKError("RebootIOServer", error);

	printDone();
}
//add method   ioServer stop
StopIOServerResource::StopIOServerResource(){
	prefix = "stop";
}

void StopIOServerResource::run(const std::map<std::string, std::string>& params) const{
	ULONG id;

	std::istringstream(params.find("iid")->second) >> id;

	ULONG error;
	//if(!(RebootIOServer(id, &error)))
	//return SDKError("RebootIOServer", error);

	printDone();
}
//add method   bootServer restart
RestartBOOTServerResource::RestartBOOTServerResource(){
	prefix = "bootRestart";
}

void RestartBOOTServerResource::run(const std::map<std::string, std::string>& params) const{
	ULONG error;
	if(!(RebootBootServer(&error)))
		return SDKError("RebootBootServer", error);
	printDone();
}

CreateIOServerResource::CreateIOServerResource(){
	prefix = "create";
}

void CreateIOServerResource::run(const std::map<std::string, std::string>& params) const{
	ADD_IOSRV_OBJ info;ADD_DIR_OBJ addDir;

	CopyInteger(nPort4, "Port");

	CHECK_PARAM("Type");
	if(params.find("Type")->second == "Primary")
		info.nType = 0;
	else if(params.find("Type")->second == "Secondary")
		info.nType = 1;
	else
		invalidParameter("Type");

	CopyString(pchAddr4, "IP");

	ULONG nid;
	ULONG error;
	ULONG nOudId;
	if(!(AddIOServer(&info, &nid, &error)))
		return SDKError("AddIOServer", error);
	//add Directory *********** 1
		addDir.nType =2;
		strcpy(addDir.pchPath, clamp(params.find("base")->second, sizeof(addDir.pchPath)).c_str());
		addDir.nSrvID =nid;
	    if(addDir.pchPath){
			if(!(AddDirectory(&addDir, &nOudId,&error)))
				return SDKError("AddDirectory", error);
		}

	//add Directory ************* 2
	addDir.nType =0;
	strcpy(addDir.pchPath, clamp(params.find("export")->second, sizeof(addDir.pchPath)).c_str());
	addDir.nSrvID =nid;
	if(addDir.pchPath) {
		if (!(AddDirectory(&addDir, &nOudId, &error)))
			return SDKError("AddDirectory", error);
	}
	//add Directory *************** 3
	addDir.nType =1;
	strcpy(addDir.pchPath, clamp(params.find("storage")->second, sizeof(addDir.pchPath)).c_str());
	addDir.nSrvID =nid;
	if(addDir.pchPath) {
		if (!(AddDirectory(&addDir, &nOudId, &error)))
			return SDKError("AddDirectory", error);
	}
	printID(nid);
}

IOServerChannelResource::IOServerChannelResource(){
	prefix = "channels";
	children.push_back(new CreateIOServerChannelResource());
	children.push_back(new UUIDIOServerChannelResource());
}

void IOServerChannelResource::run(const std::map<std::string, std::string>& params) const{
	JSON::Value* data = IOServerChannelEnumToJSON(GetInt(iid));

	printHeaders();
	data->render();

	delete data;
}

UUIDIOServerChannelResource::UUIDIOServerChannelResource(){
	param = "cid";
	validator = &numberRegex;
	children.push_back(new DeleteIOServerChannelResource());
	children.push_back(new UpdateIOServerChannelResource());
}

void UUIDIOServerChannelResource::run(const std::map<std::string, std::string>& params) const{
	die("Not supported");
}

DeleteIOServerChannelResource::DeleteIOServerChannelResource(){
	prefix = "delete";
}

void DeleteIOServerChannelResource::run(const std::map<std::string, std::string>& params) const{
	ULONG error;
	if(!(DelChannel(GetInt(cid), &error)))
		return SDKError("DelChannel", error);

	printDone();
}

UpdateIOServerChannelResource::UpdateIOServerChannelResource(){
	prefix = "update";
}

void UpdateIOServerChannelResource::run(const std::map<std::string, std::string>& params) const{
	CHECK_PARAM("IP");
	CHECK_PARAM("Port");

	std::string ip = params.find("IP")->second;

	ULONG error;
	if(!(EditChannel(GetInt(cid), GetInt(Port), ip.c_str(), &error)))
		return SDKError("EditChannel", error);

	printDone();
}

CreateIOServerChannelResource::CreateIOServerChannelResource(){
	prefix = "create";
}

void CreateIOServerChannelResource::run(const std::map<std::string, std::string>& params) const{
	ADD_CHANNEL_OBJ info;

	CopyInteger(nPort4, "Port");
	CopyString(pchAddr4, "IP");
	info.nSrvID = GetInt(iid);

	ULONG nid;

	ULONG error;
	if(!(AddChannel(&info, &nid, &error)))
		return SDKError("AddChannel", error);

	printID(nid);
}

//JSON::Value* IOServerToJSON(const IOSRV_OBJ& info,const ADD_DIR_OBJ& addDir){
JSON::Value* IOServerToJSON(const IOSRV_OBJ& info){
	JSON::Object* data = new JSON::Object();

	data->add(new JSON::String("ID"), new JSON::Integer(info.nID));
	data->add(new JSON::String("Port"), new JSON::Integer(info.nPort4));
	data->add(new JSON::String("IP"), new JSON::IP(info.pchAddr4));
//	data->add(new JSON::String("Password"), new JSON::String(info.pchPasswd)); //Do not send this
	switch(info.nType) {
		case 0:
			data->add(new JSON::String("Type"), new JSON::String("Primary"));
			break;
		case 1:
			data->add(new JSON::String("Type"), new JSON::String("Secondary"));
			break;
	}
	//freopen("C:\\log.txt", "dddddddddddddddddddddddddd", stderr);
	//alter
//	data->add(new JSON::String("base"), new JSON::String(addDir.pchPath));
//	data->add(new JSON::String("export"), new JSON::String(addDir.pchPath));
//	data->add(new JSON::String("storage"), new JSON::String(addDir.pchPath));

	return data;
}

JSON::Value* IOServerChannelToJSON(const CHANNEL_OBJ& info){
	JSON::Object* data = new JSON::Object();

	data->add(new JSON::String("ID"), new JSON::Integer(info.nID));
	data->add(new JSON::String("IP"), new JSON::IP(info.pchAddr4));
	data->add(new JSON::String("Server"), new JSON::Integer(info.nSrvID));
	data->add(new JSON::String("Port"), new JSON::Integer(info.nPort4));
	return data;
}

JSON::Array* IOServerEnumToJSON(){
	ENUM_HANDLE EnumObj = GetFirstIoServer();
	JSON::Array* array=enumToJSON<IOSRV_OBJ, IOServerToJSON, GetNextIoServer>(EnumObj);
	// add vice server
	IOSRV_OBJ item;
	ENUM_HANDLE eHandle = GetFirstSlvSrv();
	while(GetNextSlvSrv(eHandle,&item)){
		JSON::Value* value = IOServerToJSON(item);
		if(value == NULL) {
			delete array;
			return NULL;
		}
		array->add(value);
	}
	FreeEnumObject(eHandle);
	return array;
}

JSON::Array* IOServerChannelEnumToJSON(ULONG iid){
	ENUM_HANDLE EnumObj = GetFirstChannel(iid);

	return enumToJSON<CHANNEL_OBJ, IOServerChannelToJSON, GetNextChannel>(EnumObj);
}


ServerScript::ServerScript(){
	prefix = "script";
}

void ServerScript::run(const std::map<std::string, std::string>& params) const{
	printDone();
}