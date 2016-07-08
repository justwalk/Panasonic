#include "settings.h"

#include "output.h"

SettingsResource::SettingsResource(){
	prefix = "settings";
	children.push_back(new SettingsUpdateResource());
}

void SettingsResource::run(const std::map<std::string, std::string>& params) const{

	SETUP info;

	ULONG error;
	GetSetup(&info, &error);
	// if(!(GetSetup(&info, &error))) {
	//	printDone();
	//	return SDKError("GetSetup", error);
	// }
	//printDone();
	JSON::Object* data = SettingsToJSON(info);

	data->add(new JSON::String("DefaultComputer"), new JSON::Integer(1));
	data->add(new JSON::String("DefaultGroup"), new JSON::Integer(GetDfltComputerGroupID()));

	printHeaders();
	data->render();

	delete data;
}

SettingsUpdateResource::SettingsUpdateResource(){
	prefix = "update";
}

void SettingsUpdateResource::run(const std::map<std::string, std::string>& params) const{
	SETUP info;
	// don't replace unhandled data with garbage
	ULONG error;
	if(!(GetSetup(&info, &error)))
		return SDKError("GetSetup", error);

	CopyBoolean(general.bAutoJoinStatus, "AutoJoin");
	CopyString(general.szCompPrieFix, "Prefix");
	CopyInteger(general.nComputerNameLength, "PrefixLength");
	CopyInteger(general.nComputerStartNumber, "PrefixStart");
	CopyBoolean(storagedisk.bStorageStatus, "Backup");
	CopyInteger(storagedisk.nAutoBackupDays, "Days");
	CopyInteger(storagedisk.nAutoBackupHour, "Hour");
	CopyInteger(storagedisk.nAutoBackupLevels, "BackupLevel");
	CopyString(dhcp.szBootSrv, "BootServer1");
	CopyString(dhcp.szBootFile, "BootFile");
	CopyBoolean(dhcp.bDhcpStatus,"DhcpStatus");
	CopyBoolean(dhcp.bDhcpProxy, "DhcpProxy");
	CopyString(dhcp.szDhcpSIP4, "DhcpSIP4");
	CopyString(dhcp.szDhcpEIP4, "DhcpEIP4");
	CopyString(dhcp.szDhcpNetmask, "DhcpNetmask");
	CopyString(dhcp.szDhcpGetway, "DhcpGetway");
	CopyString(dhcp.szDhcpDns1, "DhcpDns1");
	CopyString(dhcp.szDhcpDns2, "DhcpDns2");
	CopyBoolean(dhcp.bDhcpProxy, "DhcpProxy");
	CopyBoolean(activeUpdate.bOnlyMergeActiveUpdate,"ActiveUpdate");
	CopyInteger(activeUpdate.nDate, "Ndate");
	CopyInteger(activeUpdate.nTime, "Ntime");
	CopyString(activeDirectory.szDomain , "Domain");
	CopyString(activeDirectory.szPassPT, "PassPT");
	CopyString(activeDirectory.szPassWD, "PassWD");

	CHECK_PARAM("DefaultGroup");
	ULONG defaultGroup = GetInt(DefaultGroup);

	if(GetDfltComputerGroupID() != defaultGroup)
	if(!SetDfltComputerGroup(defaultGroup))
		return SDKError("SetDfltComputerGroup", EBLIB_UNKNOWN);

	if(!(SetSetup(&info, &error)))
		return SDKError("SetSetup", error);

	printDone();
}

JSON::Object* SettingsToJSON(const SETUP& info) {
	JSON::Object* data = new JSON::Object();

	//General
	data->add(new JSON::String("AutoJoin"), new JSON::Boolean(info.general.bAutoJoinStatus ));
	data->add(new JSON::String("Prefix"), new JSON::String(info.general.szCompPrieFix ));
	data->add(new JSON::String("Main"), new JSON::String(info.general.szSrvDomain ));
	data->add(new JSON::String("PrefixLength"), new JSON::Integer(info.general.nComputerNameLength ));
	data->add(new JSON::String("PrefixStart"), new JSON::Integer(info.general.nComputerStartNumber ));
	//DHCP
	data->add(new JSON::String("DhcpStatus"), new JSON::Boolean(info.dhcp.bDhcpStatus ));
	data->add(new JSON::String("DhcpProxy"), new JSON::Boolean(info.dhcp.bDhcpProxy ));
	data->add(new JSON::String("DhcpSIP4"), new JSON::String(info.dhcp.szDhcpSIP4 ));
	data->add(new JSON::String("DhcpEIP4"), new JSON::String(info.dhcp.szDhcpEIP4 ));
	data->add(new JSON::String("DhcpNetmask"), new JSON::String(info.dhcp.szDhcpNetmask ));
	data->add(new JSON::String("DhcpGetway"), new JSON::String(info.dhcp.szDhcpGetway ));
	data->add(new JSON::String("DhcpDns1"), new JSON::String(info.dhcp.szDhcpDns1 ));
	data->add(new JSON::String("DhcpDns2"), new JSON::String(info.dhcp.szDhcpDns2 ));
	data->add(new JSON::String("BootSrv"), new JSON::String(info.dhcp.szBootSrv ));
	data->add(new JSON::String("BootFile"), new JSON::String(info.dhcp.szBootFile ));
	//Storagedisk
	data->add(new JSON::String("Backup"), new JSON::Boolean(info.storagedisk.bStorageStatus ));
	data->add(new JSON::String("Days"), new JSON::Integer(info.storagedisk.nAutoBackupDays ));
	data->add(new JSON::String("Hour"), new JSON::Integer(info.storagedisk.nAutoBackupHour ));
	data->add(new JSON::String("BackupLevel"), new JSON::Integer(info.storagedisk.nAutoBackupLevels ));
	//Activeupdate
	data->add(new JSON::String("ActiveUpdate"), new JSON::Boolean(info.activeUpdate.bOnlyMergeActiveUpdate ));
	data->add(new JSON::String("Ndate"), new JSON::Integer(info.activeUpdate.nDate ));
	data->add(new JSON::String("Ntime"), new JSON::Integer(info.activeUpdate.nTime ));
	//Activedirectpry
	data->add(new JSON::String("Domain"), new JSON::String(info.activeDirectory.szDomain ));
	data->add(new JSON::String("PassPT"), new JSON::String(info.activeDirectory.szPassPT ));
	data->add(new JSON::String("PassWD"), new JSON::String(info.activeDirectory.szPassWD ));

	return data;

	return data;
}