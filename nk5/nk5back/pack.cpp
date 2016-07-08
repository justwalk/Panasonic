#include "pack.h"

#include <iostream>
#include <string>
#include <sstream>
#include <fstream>
#include <cstdlib>
#include <regex>
#include <Ws2tcpip.h>

#include "error.h"
#include "login.h"
#include "output.h"
#include "bitmap.h"

#include "disk.h"

//const EnumMap<VHD_PACK_TYPE> VHD_PACK_TYPE_MAP;
//const EnumMap<VHD_EXPORTDISK_STATE> VHD_EXPORTDISK_STATE_MAP;

const EnumMap<PACK_TYPE> PACK_TYPE_MAP;
const EnumMap<PACK_MODE> PACK_MODE_MAP;

PackResource::PackResource(){
	prefix = "packs";
	children.push_back(new CreatePackResource());
	children.push_back(new UUIDPackResource());
}

void PackResource::run(const std::map<std::string, std::string>& params) const{
	ULONG id;
	
	std::istringstream(params.find("mid")->second) >> id;

	JSON::Value* data = PackEnumToJSON(id);

	printHeaders();
	data->render();

	delete data;
}

UUIDPackResource::UUIDPackResource(){
	param = "pid";
	children.push_back(new DeletePackResource);
	children.push_back(new UpdatePackResource);
	children.push_back(new DiskResource);
	//xiongpanan add start 2016/4/19
	children.push_back(new SetPackResource);
	//xiongpanan add end 2016/4/19
	//xiong panan  add start 2016/4/22
	children.push_back(new UpdateBootMenuPackResource);
	//xiong panan  add end 2016/4/22
	//xiong panan  add end 2016/4/27
	children.push_back(new StartUpdateResource);
	//xiong panan  add end 2016/4/27
	
}

void UUIDPackResource::run(const std::map<std::string, std::string>& params) const{
	ULONG id;
	
	std::istringstream(params.find("pid")->second) >> id;
	
	PACK_OBJ info;
	
	ULONG error;
	if(!(GetPackFromPackID(id, &info, &error)))
		return SDKError("GetPackFromPackID", error);
	
	JSON::Value* data = PackToJSON(info);

	printHeaders();
	data->render();

	delete data;
}



DeletePackResource::DeletePackResource(){
	prefix = "delete";
}

void DeletePackResource::run(const std::map<std::string, std::string>& params) const{
	ULONG id;
	
	std::istringstream(params.find("pid")->second) >> id;
	
	deletePack(id);
		
	printDone();
}

UpdatePackResource::UpdatePackResource(){
	prefix = "update";
}

void UpdatePackResource::run(const std::map<std::string, std::string>& params) const{
	ULONG pid;
	std::istringstream(params.find("pid")->second) >> pid;
	
	if(params.find("ActiveDisk") != params.end()) {
		ULONG did;
	
		std::istringstream(params.find("ActiveDisk")->second) >> did;
		
		ULONG error;
		if(!(SetPackActiveDisk(did, pid, &error)))
			return SDKError("SetPackActiveDisk", error);
	}
	
	if (params.find("Mode") != params.end()) {
		if(!PACK_MODE_MAP.exists(params.find("Mode")->second))
			invalidParameter("Mode");
		ULONG mode = PACK_MODE_MAP.toBit(params.find("Mode")->second);
		
		CHECK_PARAM("ExitUpdateMode");
		bool exitupdatemode = params.find("ExitUpdateMode")->second == "true";
		
		if(exitupdatemode) {
			CHECK_PARAM("Description");
			
			if(mode == PACK_MODE_UPDATE_ALIVE || mode == PACK_MODE_UPDATE_2|| mode == PACK_MODE_RW)
				invalidParameter("Mode");
			
			ULONG error;
			if(!(SetPackExitUpdateMode(pid, params.find("Description")->second.c_str(), mode, &error)))
				return SDKError("SetPackExitUpdateMode", error);
		} else {
			ULONG error;
			if(!(SetPackMode(mode, pid, &error)))
				return SDKError("SetPackMode", error);
		}
	}
	
	printDone();
}
//xiongpanan add start 2016/4/19
SetPackResource::SetPackResource(){
	prefix = "setPack";
}

void SetPackResource::run(const std::map<std::string, std::string>& params) const{
	ULONG id;
	ULONG type;
	std::istringstream(params.find("pid")->second) >> id;
	std::istringstream(params.find("PackType")->second) >> type;
	ULONG error;
	if(!SetPackCacheFlag(type,id,&error)){
		return SDKError("SetPackCacheFlag", error);
	}
	
		
	printDone();
}

//xiongpanan add end 2016/4/19

//xiong panan  add start 2016/4/22
UpdateBootMenuPackResource::UpdateBootMenuPackResource(){
	prefix = "updateBootMenuPack";
}

void UpdateBootMenuPackResource::run(const std::map<std::string, std::string>& params) const{
	ULONG pid;
	std::istringstream(params.find("pid")->second) >> pid;
	
	if (params.find("Mode") != params.end()) {
		if(!PACK_MODE_MAP.exists(params.find("Mode")->second))
			invalidParameter("Mode");
		ULONG mode = PACK_MODE_MAP.toBit(params.find("Mode")->second);
		
		CHECK_PARAM("ExitUpdateMode");
		bool exitupdatemode = params.find("ExitUpdateMode")->second == "true";
		
		if(exitupdatemode) {
			CHECK_PARAM("Description");
			
			if(mode == PACK_MODE_UPDATE_ALIVE)
				invalidParameter("Mode");
			
			ULONG error;
			if(!(SetPackExitUpdateMode(pid, params.find("Description")->second.c_str(), mode, &error)))
				return SDKError("SetPackExitUpdateMode", error);
		} else {
			ULONG error;
			if(!(SetPackMode(mode, pid, &error)))
				return SDKError("SetPackMode", error);
		}
	}
	
	printDone();
}

//xiong panan  add end 2016/4/22

//xiong panan  add start 2016/5/03
StartUpdateResource::StartUpdateResource(){
	prefix = "startUpdate";
}

void StartUpdateResource::run(const std::map<std::string, std::string>& params) const{
	ULONG pid;
	ULONG computerId;
	ULONG timeOut;
	ULONG menu_id;
	ULONG error;
	std::istringstream(params.find("pid")->second) >> pid;
	std::istringstream(params.find("computerId")->second) >> computerId;
	std::istringstream(params.find("timeOut")->second) >> timeOut;
	std::istringstream(params.find("menu_id")->second) >> menu_id;
	 if(IsPcAlive(computerId,timeOut))
	   ShutdownComputer(computerId);
	if(!(SetDfltMenuForComputer(menu_id, &error)))
		return SDKError("SetDfltMenuForComputer", error);
	if (params.find("Mode") != params.end()) {
		if(!(PACK_MODE_MAP.exists(params.find("Mode")->second)))
			invalidParameter("Mode");
		ULONG mode = PACK_MODE_MAP.toBit(params.find("Mode")->second);
						
		if(!(SetPackMode(mode, pid, &error)))
		return SDKError("SetPackMode", error);

		OBJ_COMP info;
		if(!(GetSpecifiedComputer(computerId, &info, &error)))
			return SDKError("GetSpecifiedComputer", error);
		if(!(WakeOnLanComputer(info.pchMac,&error))){
			return SDKError("WakeOnLanComputer", error);
		}
		if(!(IsPcAlive(computerId, timeOut))){
			return SDKError("IsPcAlive", EBLIB_FAILED);
		}
									
	}

		printDone();
	
	
}

//xiong panan  add end 2016/5/03




//xiong panan  add start 2016/5/03
EndUpdateResource::EndUpdateResource(){
	prefix = "endUpdate";
}

void EndUpdateResource::run(const std::map<std::string, std::string>& params) const{


		printDone();
	
	
}

//xiong panan  add end 2016/5/03










CreatePackResource::CreatePackResource(){
	prefix = "create";
}

void CreatePackResource::run(const std::map<std::string, std::string>& params) const{
	CHECK_PARAM("PackType");
	
	ULONG mid;
	std::istringstream(params.find("mid")->second) >> mid;
	
	if(!PACK_TYPE_MAP.exists(params.find("PackType")->second))
			invalidParameter("PackType");
	ULONG type= PACK_TYPE_MAP.toBit(params.find("PackType")->second);
	
	ULONG nid;
	
	ULONG error;
	if(!(AddPack(mid, type, &nid, &error)))
		return SDKError("AddPack", error);
	
	printID(nid);
}

void deletePack(ULONG pid){
	/* Maybe need to delete recursively */

	ULONG error;
	if(!(DelPack(pid, &error)))
		return SDKError("DelPack", error);
}

JSON::Value* PackToJSON(const PACK_OBJ& info){
	JSON::Object* data = new JSON::Object();

	data->add(new JSON::String("ID"), new JSON::Integer(info.nID));
	data->add(new JSON::String("ActiveDisk"), new JSON::Integer(info.nActvDsk));
	data->add(new JSON::String("Menu"), new JSON::Integer(info.nMID));
	data->add(new JSON::String("PackType"), new JSON::String(PACK_TYPE_MAP.toString(info.nType)));
	data->add(new JSON::String("PackMode"), new JSON::String(PACK_MODE_MAP.toString(info.nMode)));
	/* TODO add flags */
	data->add(new JSON::String("Name"), new JSON::Integer(info.nID));

	return data;
}



JSON::Array* PackEnumToJSON(ULONG mid){
	ENUM_HANDLE EnumObj = GetFirstPackFromSpecMenu(mid);
		
	return enumToJSON<PACK_OBJ, PackToJSON, GetNextPackFromSpecMenu>(EnumObj);
}