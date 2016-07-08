#include "onlineinfo.h"

#include "vhd.h"

JSON::Value* OnlineInfotoJSON(const VHD_BOOTM_ONLINEINFO& info){
	JSON::Object* data = new JSON::Object();

	data->add(new JSON::String("Computer"), new JSON::String(info.pwszComputerUuid));
	data->add(new JSON::String("Name"), new JSON::String(info.pwszComputerName));
	data->add(new JSON::String("IP"), new JSON::String(info.pwszInternetAddress));
	data->add(new JSON::String("Menu"), new JSON::String(info.pwszMenuUuid));
	data->add(new JSON::String("BootTime"), new JSON::Integer(info.ulLoginTime));

	return data;
}
