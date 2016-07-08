#include "home.h"
#define NO_FCGI_DEFINES
#include <fcgi_stdio.h>
#include "output.h"
#include <Windows.h>


#include <sstream>
#include <fstream>
#include <cstdlib>
#include <regex>
#include <Ws2tcpip.h>
#include "vhd.h"
#include "error.h"
#include "login.h"
#include "commonJSON.h"
#include "menu.h"
#include "bitmap.h"



extern char **FCGI_environ;
const EnumMap<ACNT_FLAG> ACNT_FLAG_MAP;
const EnumMap<BOOT_TYPE> BOOT_TYPE_MAP;

HomeResource::HomeResource(){
	prefix = "home";

}
ULONG nid;
void HomeResource::run(const std::map<std::string, std::string>& params) const{
	//printHomeData(nid);

	JSON::Value* data = ComputerEnumToJSON1();

	printHeaders();
	data->render();

	delete data;
}


BOOL isComputerinUpdateMode1(ULONG id) {
	ENUM_HANDLE mh = GetFirstComputerMenu(id);

	MENU_OBJ menu;

	while((GetNextComputerMenu(mh, &menu))){
		ENUM_HANDLE ph = GetFirstPackFromSpecMenu(menu.nID);

		PACK_OBJ pack;

		while((GetNextPackFromSpecMenu(ph, &pack))){
			if(pack.nMode == PACK_MODE_UPDATE || pack.nMode == PACK_MODE_UPDATE_2) {
				FreeEnumObject(mh);
				FreeEnumObject(ph);
				return true;
			}
		}

		FreeEnumObject(ph);
	}

	FreeEnumObject(mh);

	return false;
}


JSON::Object* ComputerToJSONPrivate1(const OBJ_COMP& info){
	JSON::Object* data = new JSON::Object();

	data->add(new JSON::String("Id"), new JSON::Integer(info.nID));
	data->add(new JSON::String("Group"), new JSON::Integer(info.nGrpID));
	/* TODO flags */
	data->add(new JSON::String("BootMenuTimeout"), new JSON::Integer(info.nMTimeO));
	data->add(new JSON::String("DefaultMenu"), new JSON::Integer(info.nDfltMenu));
	data->add(new JSON::String("MaxDataTransfer"), new JSON::Integer(info.nTBlk));
	data->add(new JSON::String("MemoryCache"), new JSON::Integer(info.nMemCh));
	data->add(new JSON::String("DiskCacheSyncSpeed"), new JSON::Integer(info.nDskCh));
	data->add(new JSON::String("ReadLimit"), new JSON::Integer(info.nRLmt));
	data->add(new JSON::String("WriteLimit"), new JSON::Integer(info.nWLmt));
	data->add(new JSON::String("ScreenX"), new JSON::Integer(info.nScrX));
	data->add(new JSON::String("ScreenY"), new JSON::Integer(info.nScrY));

	data->add(new JSON::String("IP"), new JSON::IP(info.nIP4));
	data->add(new JSON::String("Netmask"), new JSON::IP(info.nNetMask4));
	data->add(new JSON::String("Gateway"), new JSON::IP(info.nGateWay4));

	data->add(new JSON::String("Name"), new JSON::String(info.pchName));
	data->add(new JSON::String("HardwareAddress"), new JSON::String(info.pchMac));
	data->add(new JSON::String("BootFile"), new JSON::String(info.pchBootF));

	data->add(new JSON::String("Boot"), new JSON::String(BOOT_TYPE_MAP.toString(info.nFlag & BOOT_TYPE_MASK)));

	EnumMap<ACNT_FLAG>::iterator it;
	for(it = ACNT_FLAG_MAP.begin(); it != ACNT_FLAG_MAP.end(); it++)
		data->add(new JSON::String(it->first), new JSON::Boolean(it->second & info.nFlag));

	data->add(new JSON::String("ConcurrentPackTimeout"), new JSON::Integer(info.nCpTimeO));

	data->add(new JSON::String("UpdateMode"), new JSON::Boolean(isComputerinUpdateMode1(info.nID)));

	ULONG defaultMenu, error;
	if(!GetDfltMenuIdFromComputer(info.nID, &defaultMenu, &error)) {
		SDKError("GetDfltMenuIdFromComputer", error);

		return NULL;
	}

	data->add(new JSON::String("DefaultMenu"), new JSON::Integer(defaultMenu));

	return data;
}


JSON::Value* ComputerToJSON1(const OBJ_COMP& info){
	return ComputerToJSONPrivate1(info);
}

JSON::Array* ComputerEnumToJSON1(){
	JSON::Array* array = new JSON::Array();

	ENUM_HANDLE EnumObj = GetFirstComputerGroup();

	GRP_OBJ info;

	while((GetNextComputerGroup(EnumObj, &info))){
		ENUM_HANDLE EnumObj = GetFirstComputer(info.nID);

		{
			OBJ_COMP info;

			while((GetNextComputer(EnumObj, &info))){
				JSON::Object* data = ComputerToJSONPrivate1(info);

				if(data == NULL)
					return NULL;

				array->add(data);
			}
		}
	}

	return array;
}

JSON::Value* ExtendedComputerToJSON1(ULONG id){
	OBJ_COMP* info = (OBJ_COMP*)malloc(sizeof(OBJ_COMP) + 100);

	ULONG error;
	if(!(GetSpecifiedComputer(id, info, &error))) {
		SDKError("GetSpecifiedComputer", error);
		free(info);
		return NULL;
	}

	JSON::Object* data = ComputerToJSONPrivate1(*info);

	free(info);

	bool isalive = IsPcAlive(id, 1);

	data->add(new JSON::String("Online"), new JSON::Boolean(isalive));

	return data;
}
