#include "alive.h"

#include <Windows.h>
#include <iostream>

#include "vhd.h"
#include "error.h"
#include "output.h"
#include "commonJSON.h"
#include "bitmap.h"

VOID CALLBACK ProcMsg(const eblib_struct::PIMSG pMsg, const ULONG nMsgType);

const EnumMap<PACK_MODE> PACK_MODE_MAP;

AliveResource::AliveResource(){
	prefix = "alive";
}

void AliveResource::run(const std::map<std::string, std::string>& params) const{
	ULONG error = 0;
	if (!RegisterProcMsgFun(ProcMsg))
		return SDKError("RegisterProcMsgFun", error);

	printHeaders();

	while(true) {
		Sleep(1000);
		IsConnected();
	}
}

VOID CALLBACK ProcMsg(const eblib_struct::PIMSG info, const ULONG type) {
	JSON::Value* ev = SignaltoJSON(info, type);
	ev->render();
	delete ev;
	FCGI_fputs("\n", FCGI_stdout);
	FCGI_fflush(FCGI_stdout);
}

JSON::Value* SignaltoJSON(const PIMSG& info, const ULONG type) {
	JSON::Object* data = new JSON::Object();

	switch(type){
		case NEW_COMP_MSG:
			data->add(new JSON::String("Type"), new JSON::String("ComputerAdd"));
			break;
		case DELETE_DISK_MSG:
			data->add(new JSON::String("Type"), new JSON::String("DeleteDisk"));
			break;
		case NEW_DISK_MSG:
			data->add(new JSON::String("Type"), new JSON::String("DiskAdd"));
			break;
		case CHANGE_PACK_MODE_MSG:
			data->add(new JSON::String("Type"), new JSON::String("ChangePackMode"));

			data->add(new JSON::String("ID"), new JSON::Integer(info->chagePackMode.nID));
			data->add(new JSON::String("Mode"), new JSON::String(PACK_MODE_MAP.toString(info->chagePackMode.nMode)));
			break;
		case RENAME_COMP_MSG:
			data->add(new JSON::String("Type"), new JSON::String("ComputerRename"));
			break;
		case ALIVE_MSG:
			data->add(new JSON::String("Type"), new JSON::String("Alive"));
			{
				IO_ALIVE* ioAlive = &info ->ioAlive;
				data->add(new JSON::String("Server"), new JSON::Integer(ioAlive->nID));
			}
			break;
		case PROCESS_MSG:
			data->add(new JSON::String("Type"), new JSON::String("ProcessMsg"));
			break;
		case CLIENT_ALIVE_MSG:
			data->add(new JSON::String("Type"), new JSON::String("ComputerAlive"));
			{
				int i;

				WCHAR* from = info->clientAliveTcpMsg.ClientAlive.szTime;
				char transformed[1000];
				size_t ret;

				wcstombs_s(&ret, transformed, 1000, from, _TRUNCATE);

				data->add(new JSON::String("ID"), new JSON::Integer(info->clientAliveTcpMsg.ClientAlive.nCompID));
				data->add(new JSON::String("Time"), new JSON::String(transformed));
				data->add(new JSON::String("Menu"), new JSON::Integer(info->clientAliveTcpMsg.ClientAlive.nMenuID));
				data->add(new JSON::String("IP"), new JSON::IP(info->clientAliveTcpMsg.ClientAlive.nIpAddr));

				JSON::Array* disks = new JSON::Array();

				for(i=0;i<info->clientAliveTcpMsg.ClientAlive.nDiskCount;i++) {
					JSON::Object* disk = new JSON::Object();

					disk->add(new JSON::String("ID"), new JSON::Integer(info->clientAliveTcpMsg.ClientAlive.pDisk[i].nID));
					disk->add(new JSON::String("Parent"), new JSON::Integer(info->clientAliveTcpMsg.ClientAlive.pDisk[i].nParentID));

					disks->add(disk);
				}

				data->add(new JSON::String("Disks"), disks);

				JSON::Array* ioservers = new JSON::Array();

				for(i=0;i<MAX_IO_SERVERS_PER_CLIENT;i++)
					if(info->clientAliveTcpMsg.ClientAlive.pIOIps[i] != 0)
						ioservers->add(new JSON::IP(info->clientAliveTcpMsg.ClientAlive.pIOIps[i]));

				data->add(new JSON::String("IOServers"), ioservers);
			}
			break;
		case CLIENT_ALIVE_TYPE_COMP_MSG:
			data->add(new JSON::String("Type"), new JSON::String("ComputerAliveComputer"));
			break;
		case CLIENT_ALIVE_TYPE_USER_MSG:
			data->add(new JSON::String("Type"), new JSON::String("ComputerAliveUser"));
			break;
		case DATABASE_STREAM_MSG:
			data->add(new JSON::String("Type"), new JSON::String("Database"));
			break;
		default:
			data->add(new JSON::String("Type"), new JSON::String("Unhandled"));
			break;
	}

	return data;
}
