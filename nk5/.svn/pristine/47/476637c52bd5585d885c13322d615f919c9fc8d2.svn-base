#include "menu.h"

#include "error.h"
#include "login.h"
#include "output.h"
#include "bitmap.h"

#include "pack.h"

#include <sstream>

//const EnumMap<VHD_MENU_STATUS> VHD_MENU_STATUS_MAP;

MenuResource::MenuResource(){
	prefix = "menus";
	children.push_back(new CreateMenuResource());
	//xiongpanan add start 2016/4/8
	children.push_back(new OperationMenuResource());
	//xiongpanan add end 2016/4/8
	children.push_back(new UUIDMenuResource());

	
}

void MenuResource::run(const std::map<std::string, std::string>& params) const{
	ULONG id;
	
	std::istringstream(params.find("id")->second) >> id;
	
	JSON::Value* data = MenuEnumToJSON(id);

	printHeaders();
	data->render();

	delete data;
}

CreateMenuResource::CreateMenuResource(){
	prefix = "create";
}

void CreateMenuResource::run(const std::map<std::string, std::string>& params) const{
	ADD_MENU_OBJ info;
	
	CopyInteger(nAcntID, "id");
	info.nAcntType = 0;
	CopyString(pchName, "Name");
	
	ULONG nid;
	
	ULONG error;
	if(!(AddMenu(&info, &nid, &error)))
		return SDKError("AddMenu", error);

	printID(nid);
	
}
//xiongpanan add start 2016/4/8
OperationMenuResource::OperationMenuResource(){
	prefix = "createMenu";
}

void OperationMenuResource::run(const std::map<std::string, std::string>& params) const{
	ADD_MENU_OBJ info;
	
	CopyInteger(nAcntID, "id");
	info.nAcntType = 0;
	CopyString(pchName, "Name");
	
	ULONG nid;
	ULONG error;
	if(!(AddMenu(&info, &nid, &error)))
		return SDKError("AddMenu", error);
	printID(nid);
	

//续订菜单下所有的磁盘包
	
	ULONG menuid;
	ULONG packId;
	std::istringstream(params.find("ID")->second) >> menuid;
	 ENUM_HANDLE eHandle = GetFirstPackFromSpecMenu(menuid,&error);

  if(eHandle != NULL)
  {
     PACK_OBJ tmpPack;

     while(GetNextPackFromSpecMenu(eHandle, &tmpPack))
     {
     	PACK_OBJ packObj;
        if(GetPackFromPackID(tmpPack.nID,&packObj,&error)){
			if(!AddPack(nid,packObj.nType,&packId)){
				return SDKError("AddPack", error);
			}
        }

 			 ENUM_HANDLE eHandleDisk= GetFirstExportDisk(tmpPack.nID,&error);

 			if(eHandleDisk!=NULL){
 				DISK_INFO_OBJ tmpDisk;
 				
 				while(GetNextExportDisk(eHandleDisk,&tmpDisk)){
 					DISK_INFO_OBJ infoDisk;
 					if(GetSpecifiedDisk(tmpDisk.nID,&infoDisk,&error)){
 								ADD_EXPORT_DISK addInfoDisk;
 								addInfoDisk.nSrvID = addInfoDisk.nSrvID;
								addInfoDisk.nType = infoDisk.nType;
								addInfoDisk.nSizeMb = infoDisk.nSizeMb;
								addInfoDisk.nPackID = packId;
								strcpy_s(addInfoDisk.pchName, sizeof(addInfoDisk.pchName), infoDisk.pchName);
							ULONG diskId;
							if(!AddExportDiskToPack(&addInfoDisk, &diskId, &error)){
									return SDKError("AddExportDiskToPack", error);
							}
 					}

 				}


				FreeEnumObject(eHandleDisk);
 			}


     }
      FreeEnumObject(eHandle);

  }
	
	
}
//xiongpanan add start 2016/4/12



UUIDMenuResource::UUIDMenuResource(){
	param = "mid";
	validator = &numberRegex;
	children.push_back(new DeleteMenuResource());
	children.push_back(new UpdateMenuResource());
	children.push_back(new PackResource());
	children.push_back(new SetDefaultMenuResource());
}

void UUIDMenuResource::run(const std::map<std::string, std::string>& params) const{
	ULONG id;
	
	std::istringstream(params.find("mid")->second) >> id;

	MENU_OBJ info;
	
	ULONG error;
	if(!(GetSpecifiedMenu(id, &info, &error)))
		return SDKError("GetSpecifiedMenu", error);
	
	JSON::Value* data = MenuToJSON(info);

	printHeaders();
	data->render();

	delete data;
}

DeleteMenuResource::DeleteMenuResource(){
	prefix = "delete";
}

void DeleteMenuResource::run(const std::map<std::string, std::string>& params) const{
	/* Maybe need to delete recursively */
	
	ULONG id;
	
	std::istringstream(params.find("mid")->second) >> id;
	
	ULONG error;
	if(!(DelMenu(id, &error)))
		return SDKError("DelMenu", error);
		
	printDone();
}

UpdateMenuResource::UpdateMenuResource(){
	prefix = "update";
}

void UpdateMenuResource::run(const std::map<std::string, std::string>& params) const{
	CHECK_PARAM("Name");
	
	ULONG id;
	
	std::istringstream(params.find("mid")->second) >> id;
	
	ULONG error;
	if(!(EditMenu(id, params.find("Name")->second.c_str(), &error)))
		return SDKError("EditMenu", error);
		
	printDone();
}

//xiongpanan add start 2016/4/12

SetDefaultMenuResource::SetDefaultMenuResource(){
	prefix = "setDefaultMenu";
}

void SetDefaultMenuResource::run(const std::map<std::string, std::string>& params) const{
	/* Maybe need to delete recursively */
	
	ULONG id;
	
	std::istringstream(params.find("mid")->second) >> id;
	
	ULONG error;
	if(!(SetDfltMenuForComputer(id)))
		return SDKError("SetDfltMenuForComputer", error);
		
	printID(id);
}
//xiongpanan add end 2016/4/12

JSON::Value* MenuToJSON(const MENU_OBJ& info){
	JSON::Object* data = new JSON::Object();

	data->add(new JSON::String("ID"), new JSON::Integer(info.nID));
	data->add(new JSON::String("Name"), new JSON::String(info.pchName));
	data->add(new JSON::String("Computer"), new JSON::Integer(info.nAcntID));

	return data;
}

JSON::Array* MenuEnumToJSON(ULONG cid){
	ENUM_HANDLE EnumObj = GetFirstComputerMenu(cid);
		
	return enumToJSON<MENU_OBJ, MenuToJSON, GetNextComputerMenu>(EnumObj);
}