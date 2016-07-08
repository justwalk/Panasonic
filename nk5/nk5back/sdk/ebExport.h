#pragma once

#include <Windows.h>
#include "idata.h"

#ifndef EXPORT_C
#define EXPORT_C
#endif

EXPORT_C BOOL Initeblib(OUT ULONG *pErrorCode = NULL);
EXPORT_C VOID Releaseeblib();
EXPORT_C BOOL Login(IN const CHAR *pchSevIP, 
					IN const USHORT nPort, 
					IN const CHAR *pchUser,
					IN const CHAR *pchPass, 
					OUT ULONG *pErrorCode = NULL);
EXPORT_C BOOL  RegisterProcMsgFun(ProcMsgFun pProcMsg);
EXPORT_C ENUM_HANDLE GetFirstIoServer(OUT ULONG *pErrorCode=NULL);
EXPORT_C BOOL GetNextIoServer(IN ENUM_HANDLE eHandle, 
							  OUT eblib_struct::IOSRV_OBJ* pIoSrvItem);
EXPORT_C ENUM_HANDLE GetFirstChannel(IN const ULONG nIoSrvID,
									 OUT ULONG *pErrorCode=NULL);
EXPORT_C BOOL GetNextChannel(IN ENUM_HANDLE eHandle,
							 OUT eblib_struct::CHANNEL_OBJ* pChannelItem);
EXPORT_C ENUM_HANDLE GetFirstDirectory(IN const ULONG nType, 
									   IN const ULONG nIoSrvID,
									   OUT ULONG *pErrorCode=NULL);
EXPORT_C BOOL GetNextDirectory(IN ENUM_HANDLE eHandle, 
							   OUT eblib_struct::DIR_OBJ* pDirItem);	
EXPORT_C ENUM_HANDLE GetFirstBaseDisk(IN const ULONG nIoSrvID,
									  IN const ULONG nPID,
									  OUT ULONG *pErrorCode=NULL);
EXPORT_C BOOL GetNextBaseDisk(IN ENUM_HANDLE eHandle,
							  OUT eblib_struct::DISK_INFO_OBJ* pDiskItem);
EXPORT_C ENUM_HANDLE GetFirstExportDisk(IN const ULONG nPackID,
										OUT ULONG *pErrorCode=NULL);
EXPORT_C BOOL GetNextExportDisk(IN ENUM_HANDLE eHandle,
								OUT eblib_struct::DISK_INFO_OBJ* pDiskItem);
EXPORT_C ENUM_HANDLE GetFirstDiskSnapshot(IN const ULONG nPID,
										  OUT ULONG *pErrorCode=NULL);
EXPORT_C BOOL GetNextDiskSnapshot(IN ENUM_HANDLE eHandle,
								  OUT eblib_struct::DISK_INFO_OBJ* pDiskItem);
EXPORT_C ENUM_HANDLE GetFirstComputerGroup(OUT ULONG *pErrorCode=NULL);
EXPORT_C BOOL GetNextComputerGroup(IN ENUM_HANDLE eHandle,
								   OUT eblib_struct::GRP_OBJ* pGrpItem);
EXPORT_C ENUM_HANDLE GetFirstUserGroup(OUT ULONG *pErrorCode=NULL);
EXPORT_C BOOL GetNextUserGroup(IN ENUM_HANDLE eHandle, 
							   OUT eblib_struct::GRP_OBJ* pGrpItem);
EXPORT_C ENUM_HANDLE GetFirstComputer(IN const ULONG nGrpID, OUT ULONG *pErrorCode=NULL);
EXPORT_C BOOL GetNextComputer(IN ENUM_HANDLE eHandle, 
							  OUT eblib_struct::OBJ_COMP* pCompItem);
EXPORT_C BOOL GetSpecifiedComputer(IN const ULONG nID, 
								   OUT eblib_struct::OBJ_COMP* pCompItem,
								   OUT ULONG* pErrorCode);
EXPORT_C ENUM_HANDLE GetFirstUser(IN const ULONG nGrpID,
								  OUT ULONG *pErrorCode=NULL);
EXPORT_C BOOL GetNextUser(IN ENUM_HANDLE eHandle,
						  OUT eblib_struct::USER_OBJ* pUserItem);
EXPORT_C BOOL GetSpecifiedUser( IN const ULONG nSpecifiedID,
							   OUT eblib_struct::USER_OBJ* pUserItem,
							   OUT ULONG *pErrorCode = NULL);
EXPORT_C ENUM_HANDLE GetFirstPackModeFromComputer(IN const ULONG nCompID,
												  OUT ULONG *pErrorCode=NULL);
EXPORT_C BOOL GetNextPackModeFromComputer(IN ENUM_HANDLE eHandle,
										  OUT eblib_struct::PACK_MODE_OBJ* pPackObj);
EXPORT_C ENUM_HANDLE GetFirstPackModeFromUser(IN const ULONG nUserID,
											  OUT ULONG *pErrorCode=NULL);
EXPORT_C BOOL GetNextPackModeFromUser(IN ENUM_HANDLE eHandle,
									  OUT eblib_struct::PACK_MODE_OBJ* pPackObj);
EXPORT_C ENUM_HANDLE GetFirstComputerMenu(IN const ULONG nCompID,
										  OUT ULONG *pErrorCode=NULL);
EXPORT_C BOOL GetNextComputerMenu(IN ENUM_HANDLE eHandle,
								  OUT eblib_struct::MENU_OBJ* pMenuItem);
EXPORT_C ENUM_HANDLE GetFirstUserMenu(IN const ULONG nUserID,
									  OUT ULONG *pErrorCode=NULL);
EXPORT_C BOOL GetNextUserMenu(IN ENUM_HANDLE eHandle, 
							  OUT eblib_struct::MENU_OBJ* pMenuItem);
EXPORT_C void FreeEnumObject(IN ENUM_HANDLE eHandle);
EXPORT_C ULONG GetEnumObjectSize(IN const ENUM_HANDLE eHandle);
EXPORT_C ULONG GetDfltComputerGroupID();
EXPORT_C ULONG GetDfltUserGroupID();
EXPORT_C ENUM_HANDLE GetFirstPackFromSpecMenu( IN const ULONG nMID,
											  OUT ULONG *pErrorCode=NULL );
EXPORT_C BOOL GetNextPackFromSpecMenu( IN ENUM_HANDLE eHandle,
									  OUT eblib_struct::PACK_OBJ* pPackItem );
EXPORT_C BOOL GetSetup(OUT eblib_struct::SETUP* pSetup, 
					   OUT ULONG *pErrorCode = NULL);
EXPORT_C BOOL SetSetup(IN const eblib_struct::SETUP* pSetup, 
					   OUT ULONG *pErrorCode = NULL);
EXPORT_C BOOL AddIOServer(IN const eblib_struct::ADD_IOSRV_OBJ* pIoSrvObj,
						  OUT ULONG* pOutID,
						  OUT ULONG *pErrorCode = NULL);
EXPORT_C BOOL DelIOServer(IN const ULONG nIoSrvID,
						  OUT ULONG *pErrorCode = NULL);
EXPORT_C BOOL AddBaseDisk(IN const eblib_struct::ADD_BASE_DISK_OBJ* pDiskObj,
						  OUT ULONG* pOutID,
						  IN BOOL bCreateDir = TRUE, 
						  OUT ULONG *pErrCode=NULL);
EXPORT_C BOOL DelBaseDisk(IN const ULONG nDiskID,
						  OUT ULONG *pErrorCode = NULL);
EXPORT_C BOOL EditBaseDisk(IN const ULONG nDiskID, 
						   IN const CHAR *pchNewName,
						   OUT ULONG *pErrorCode = NULL);
EXPORT_C BOOL GetProxyDiskSync(IN const ULONG nDiskID,
							   OUT eblib_struct::DISK_SYNC* pDiskSync, 
							   OUT ULONG *pErrorCode = NULL);
EXPORT_C BOOL SetProxyDiskSync(IN const ULONG nDiskID, 
							   IN const eblib_struct::DISK_SYNC* pDiskSync, 
							   OUT ULONG *pErrorCode = NULL);
EXPORT_C BOOL ProxyDiskToBaseDisk(IN const ULONG nDiskID,
								  OUT ULONG *pErrorCode = NULL);
EXPORT_C BOOL AddDirectory(IN const eblib_struct::ADD_DIR_OBJ* pDirObj,
						   OUT ULONG* pOutID, 
						   OUT ULONG *pErrorCode = NULL);
EXPORT_C BOOL DelDirectory(IN const ULONG nDirID,
						   OUT ULONG *pErrorCode = NULL);
EXPORT_C BOOL EditDirectory(IN const ULONG nDirID,
							IN const CHAR  *pchPath, 
							OUT ULONG *pErrorCode = NULL);
EXPORT_C BOOL AddChannel(IN const eblib_struct::ADD_CHANNEL_OBJ* pChannelObj,
						 OUT ULONG* pOutID, 
						 OUT ULONG *pErrorCode = NULL);
EXPORT_C BOOL DelChannel(IN const ULONG nChannelID, 
						 OUT ULONG *pErrorCode = NULL);
EXPORT_C BOOL EditChannel(IN const ULONG nChannelID,
						  IN const ULONG nPort4, 
						  IN const CHAR *pchIP4,
						  OUT ULONG *pErrorCode = NULL);
EXPORT_C ENUM_HANDLE GetFirstFileFromIOSrv(IN const ULONG nIoID, 
										   IN const CHAR *pPath,
										   OUT ULONG *pErrorCode=NULL);
EXPORT_C BOOL GetNextFileFromIOSrv(IN ENUM_HANDLE eHandle, 
								   OUT eblib_struct::GET_FILE_OBJ* pIOPath);

EXPORT_C ENUM_HANDLE GetFirstRestorePoint(IN const ULONG nDiskID,
										  OUT ULONG *pErrorCode=NULL);
EXPORT_C BOOL GetNextRestorePoint(IN ENUM_HANDLE eHandle,
								  OUT eblib_struct::SHOW_REST_POINT* pRePoint);

EXPORT_C BOOL CommitToParentDisk(IN const ULONG nDiskID,
								 OUT ULONG *pErrorCode = NULL);

EXPORT_C ENUM_HANDLE GetFirstPhyDisk(IN const ULONG nSrvIoID,
									 OUT ULONG *pErrorCode=NULL);
EXPORT_C BOOL GetNextPhyDisk(IN ENUM_HANDLE eHandle, 
							 eblib_struct::SHOW_PHY_DISK* pIOPhyDisk);

EXPORT_C ENUM_HANDLE GetFirstCacheDrive(IN const ULONG nSrvID,
										OUT ULONG *pErrorCode=NULL);
EXPORT_C BOOL GetNextCacheDrive(IN ENUM_HANDLE eHandle,
								OUT eblib_struct::DRIVE_INFO_OBJ* pCacheDrive);

EXPORT_C ENUM_HANDLE GetFirstCacheHardDisk(IN const ULONG nSrvID,
										   OUT ULONG *pErrorCode=NULL);
EXPORT_C BOOL GetNextCacheHardDisk(IN ENUM_HANDLE eHandle, 
								   OUT eblib_struct::SHOW_CACHE_DISK* pHardDisk);

EXPORT_C BOOL SetIOCache(IN const ULONG nSrvID, 
						 IN const ULONG nDeviceID,
						 IN const ULONG nCacheDeviceID, 
						 IN const ULONG nMemchMb,
						 IN const ULONG nDskChGb, 
						 OUT ULONG *pErrorCode = NULL);

EXPORT_C BOOL RestoreToSpecifiedRestorePoint(IN const ULONG nDiskID, 
											 IN const ULONG nVerMin,
											 IN const ULONG nVerMax, 
											 OUT ULONG *pErrorCode = NULL);

EXPORT_C BOOL GetExistVhdInfo(IN const ULONG nIoSrvID, 
							  IN const CHAR *pchPath, 
							  OUT eblib_struct::SHOW_VHD_INFO* pVhdInfo,
							  OUT ULONG *pErrorCode = NULL);

EXPORT_C BOOL RebootIOServer(IN const ULONG nIoSrvID,
							 OUT ULONG *pErrorCode = NULL);

EXPORT_C BOOL ModifyPassword(IN const ULONG nSrvID,
							 IN const CHAR *pchNewPasswd, 
							 OUT ULONG *pErrorCode = NULL);

EXPORT_C BOOL GetAboutInfo(OUT eblib_struct::ABOUT_INFO_OBJ* pInfoObj,
						   OUT ULONG *pErrorCode = NULL);

EXPORT_C BOOL ImportDatabaseFile(IN const CHAR *pchFileName,
								 OUT ULONG *pErrorCode = NULL);
EXPORT_C BOOL ExportDatabaseFile(IN CHAR *pchFileName,
								 OUT ULONG *pErrorCode = NULL);

EXPORT_C BOOL AddGroup(IN const eblib_struct::ADD_GRP_OBJ* pGrpObj,
					   OUT ULONG* pOutID,
					   OUT ULONG *pErrorCode = NULL);
EXPORT_C BOOL EditGroup(IN const ULONG nGrpID, 
						IN const CHAR *pchNewName, 
						OUT ULONG *pErrorCode = NULL);

EXPORT_C BOOL SetDfltUserGroup(IN const ULONG nUserGrpID);
EXPORT_C BOOL SetDfltComputerGroup(IN const ULONG nComputerGrpID);

EXPORT_C BOOL DelComputerGroup(IN const ULONG nGrpID,
							   OUT ULONG *pErrorCode = NULL);
EXPORT_C BOOL DelUserGroup(IN const ULONG nGrpID,
						   OUT ULONG *pErrorCode = NULL);

EXPORT_C BOOL AddComputer(IN const eblib_struct::ADD_COMP_OBJ* pCompObj,
						  OUT ULONG* pOutID,
						  OUT ULONG *pErrorCode = NULL);
EXPORT_C BOOL EditComputer(IN const eblib_struct::EDIT_COMP_OBJ* pCompObj, 
						   IN const ULONG nCompID,
						   OUT ULONG *pErrorCode = NULL);
EXPORT_C BOOL DelComputer(IN const ULONG nCompID,
						  OUT ULONG *pErrorCode = NULL);
EXPORT_C BOOL MoveComputerToSpecifyGroup(IN const ULONG nCompID, 
										 IN const ULONG nGrpID,
										 OUT ULONG *pErrorCode = NULL);

EXPORT_C BOOL DelUser(IN const ULONG nUserID,
					  OUT ULONG *pErrorCode = NULL);
EXPORT_C BOOL AddUser(IN const eblib_struct::ADD_USER_OBJ* pUserObj,
					  OUT ULONG* pOutID,
					  OUT ULONG *pErrorCode = NULL);
EXPORT_C BOOL MoveUserToSpecifyGroup(IN const ULONG nUserID, 
									 IN const ULONG nGrpID,
									 OUT ULONG *pErrorCode = NULL);
EXPORT_C BOOL EditUser(IN const eblib_struct::EDIT_USER_OBJ* pUserObj, 
					   IN const ULONG nUserID,
					   OUT ULONG *pErrorCode = NULL);

EXPORT_C BOOL GetSpecifiedMenu(IN const ULONG nMenuId, 
							   OUT eblib_struct::MENU_OBJ* pMenuObj,
							   OUT ULONG *pErrorCode = NULL);
EXPORT_C BOOL AddMenu(IN const eblib_struct::ADD_MENU_OBJ* pMenuObj, 
					  OUT ULONG* pOutID,
					  OUT ULONG *pErrorCode = NULL);
EXPORT_C BOOL EditMenu(IN const ULONG nMenuID, 
					   IN const CHAR *pchNewName,
					   OUT ULONG *pErrorCode = NULL);
EXPORT_C BOOL DelMenu(IN const ULONG nMenuID,
					  OUT ULONG *pErrorCode = NULL);
EXPORT_C BOOL SetDfltMenuForComputer(IN const ULONG nMenuID,
									  OUT ULONG *pErrorCode = NULL);
EXPORT_C BOOL SetDfltMenuForUser(IN const ULONG nMenuID,
								  OUT ULONG *pErrorCode = NULL);

EXPORT_C BOOL GetPackFromPackID(IN const ULONG nPackID,
								OUT eblib_struct::PACK_OBJ* pPackObj,
								OUT ULONG *pErrorCode = NULL);
EXPORT_C BOOL RenewPack(IN const eblib_struct::RENEW_PACK_OBJ* pPackObj, 
						OUT ULONG* pOutID,
						OUT ULONG *pErrorCode = NULL);
EXPORT_C BOOL AddPack(IN const ULONG nMID, 
					  IN const ULONG nPackType,
					  OUT ULONG* pOutID,
					  OUT ULONG *pErrorCode = NULL);
EXPORT_C BOOL DelPack(IN const ULONG nPackID, 
					  OUT ULONG *pErrorCode = NULL);
EXPORT_C BOOL SetPackMode(IN const ULONG nMode, 
						  IN const ULONG nPackID,
						  OUT ULONG *pErrorCode = NULL);
EXPORT_C BOOL SetPackActiveDisk(IN const ULONG nADiskID, 
								IN const ULONG nPackID,
								OUT ULONG *pErrorCode = NULL);
//EXPORT_C BOOL SetPackUpdateMode(IN const ULONG nPackID);
EXPORT_C BOOL SetPackExitUpdateMode(IN const ULONG nPackID, 
									IN const CHAR *pchDesc, 
									IN const ULONG nNewPackMode, 
									OUT ULONG *pErrorCode = NULL);

EXPORT_C BOOL ResolutionPackCacheFlag(IN const ULONG nFlag, 
									  OUT eblib_struct::PACK_CACHE_FLAG* pPackCacheFlag);
EXPORT_C BOOL SetPackCacheFlag(IN const ULONG nSet, 
							   IN const ULONG nPackID, 
							   OUT ULONG *pErrorCode = NULL);
EXPORT_C BOOL SetSmartPackCounter(IN const ULONG nTimes, 
								  IN const ULONG nPackID,
								  OUT ULONG *pErrorCode = NULL);
EXPORT_C BOOL MountPack(IN const ULONG nFlag, 
						IN const ULONG nPackID,
						IN const ULONG nCompID,
						OUT ULONG *pErrorCode = NULL);

EXPORT_C BOOL DelExportDisk(IN const ULONG nExportDiskID,
							OUT ULONG *pErrorCode = NULL);
EXPORT_C BOOL AddExportDiskToPack(IN const eblib_struct::ADD_EXPORT_DISK* pDiskObj, 
								  OUT ULONG* pOutID,
								  OUT ULONG *pErrorCode = NULL);
EXPORT_C BOOL EditExportDisk(IN const ULONG nDiskID, 
							 IN const CHAR *pchNewName, 
							 OUT ULONG *pErrorCode = NULL);

EXPORT_C BOOL RebootComputer(IN const ULONG nCompID); 
EXPORT_C BOOL QuickRebootComputer(IN const ULONG nCompID);

EXPORT_C BOOL ShutdownComputer(IN const ULONG nCompID);
EXPORT_C BOOL QuickShutdownComputer(IN const ULONG nCompID);

EXPORT_C BOOL WakeOnLanComputer(IN const CHAR *pchMac, 
								OUT ULONG *pErrorCode = NULL);
EXPORT_C BOOL LogoutComputer(IN const ULONG nCompID);

EXPORT_C BOOL SendMsgToComputer(IN const ULONG nCompID,
								IN const CHAR *pInfo);
EXPORT_C BOOL SendCmdToComputer(IN const ULONG nCompID, 
								IN const CHAR *pInfo);

EXPORT_C BOOL RebootBootServer(OUT ULONG *pErrorCode = NULL);
EXPORT_C BOOL ModifyAdminPasswd(IN const CHAR *pchNewPass, 
								OUT ULONG *pErrorCode = NULL);

EXPORT_C BOOL BeginTransaction( OUT ULONG *pErrorCode = NULL);
EXPORT_C BOOL EndTransaction( OUT ULONG *pErrorCode = NULL);

EXPORT_C BOOL IsConnected();
EXPORT_C BOOL IsPcAlive(IN const ULONG nComputerID,
						IN const ULONG nTimeOut);

EXPORT_C BOOL GetComputerIdFromName(IN const CHAR* pchGrpName, 
									IN const CHAR *pchName, 
									OUT ULONG* pOutID,
									OUT ULONG *pErrorCode = NULL);
EXPORT_C BOOL GetComputerIdFromMAC(IN const CHAR chMac[32],
								   OUT ULONG* pOutID,
								   OUT ULONG *pErrorCode = NULL);
EXPORT_C BOOL GetComputerMenuIdFromName(IN const CHAR *pchMenuName,
										IN const ULONG nCompID,
										OUT ULONG* pOutID,
										OUT ULONG *pErrorCode = NULL);
EXPORT_C BOOL GetPackIdFromMenuIndex(IN const ULONG nPackIndex, 
									 IN const ULONG nMenuID,
									 OUT ULONG* pOutID,
									 OUT ULONG *pErrorCode = NULL);
EXPORT_C BOOL GetMACFromName(IN const CHAR* pchGrpName,
							 IN const CHAR *pchComputerName,
							 OUT CHAR chMac[32],
							 OUT ULONG *pErrorCode = NULL);
EXPORT_C BOOL EnableBootMenuForComputer(IN const ULONG nCompID, 
										BOOL bEnable = TRUE,
										OUT ULONG *pErrorCode = NULL);
EXPORT_C BOOL SetStartBootDevice(IN const ULONG nCompID,
								 IN const ULONG nDeviceType,
								 OUT ULONG *pErrorCode = NULL);
//EXPORT_C BOOL ResetCache(IN const ULONG nPackID);
EXPORT_C BOOL GetComputerGroupIdFromName(IN const CHAR *pchGrpName, 
										 OUT ULONG* pGrpID,
										 OUT ULONG *pErrorCode = NULL);
//EXPORT_C BOOL IsPackUpdataMode(IN const ULONG nPackID);
//EXPORT_C BOOL GetComputerFromId(IN const ULONG nId, 
//									OUT eblib_struct::OBJ_COMP* pCompItem);
EXPORT_C BOOL GetDfltMenuIdFromComputer(IN const ULONG nCompID, 
										OUT ULONG* pMenuID,
										OUT ULONG *pErrorCode = NULL);
//EXPORT_C BOOL CopyBalancePackToMenu(IN const ULONG nMenuID, 
//									IN const ULONG nPackID, 
//									OUT ULONG& nNewPackID);
EXPORT_C BOOL UpdateComputerMac(IN const ULONG nComputerID, 
								IN const CHAR *pNewMac,
								OUT ULONG *pErrorCode = NULL);

EXPORT_C BOOL ScanBootService(OUT eblib_struct::SERVICE_INFO_LIST* pBootSrvInfoList);
EXPORT_C BOOL ScanIoService(OUT eblib_struct::SERVICE_INFO_LIST* pIoSrvInfoList);
EXPORT_C BOOL GetIoMemoryStatus(IN const ULONG nIoSrvID, 
								OUT ULONG* pMemory,
								OUT ULONG *pErrorCode = NULL);
EXPORT_C BOOL GetIoAdapterList(IN const ULONG nIoSrvID, 
							   OUT eblib_struct::ADAPTER_LIST* pAdapterList,
							   OUT ULONG *pErrorCode = NULL );
EXPORT_C BOOL GetHardDiskList(IN const ULONG nIoSrvID, 
							  OUT eblib_struct::HARD_DISK_LIST* pHardDiskList,
							  OUT ULONG *pErrorCode = NULL );
EXPORT_C BOOL GetHardDiskInfoList(IN const ULONG nIoSrvID, 
								  IN const ULONG nDeviceID,
								  OUT eblib_struct::DISK_INFO_LIST* pDiskInfoList,
								  OUT ULONG *pErrorCode = NULL );


EXPORT_C ENUM_HANDLE GetFirstUsageBaseDiskComputerList(IN const ULONG nBaseDiskID,
													   OUT ULONG *pErrorCode=NULL);
EXPORT_C BOOL GetNextUsageBaseDiskComputerList(IN ENUM_HANDLE eHandle, 
											   OUT eblib_struct::COMP_USAGE_LIST* pCompList);

//EXPORT_C ENUM_HANDLE GetFirstComputerInfoList(IN const std::vector<ULONG>* pIdList);
//EXPORT_C BOOL GetNextComputerInfoList(IN ENUM_HANDLE eHandle, OUT eblib_struct::COMP_USAGE_LIST& compList);
EXPORT_C BOOL GetSpecifiedDisk(IN const ULONG nDiskID, 
							   OUT eblib_struct::DISK_INFO_OBJ* pDiskInfo,
							    OUT ULONG *pErrorCode = NULL);

EXPORT_C BOOL GetCountPackOfMenu(IN const ULONG nMenuID, 
								 OUT ULONG* pPackNum, 
								 OUT ULONG *pErrorCode = NULL);
EXPORT_C BOOL GetCountDiskOfPack(IN const ULONG nPackID, 
								 OUT ULONG* pDiskNum,
								 OUT ULONG *pErrorCode = NULL);
//EXPORT_C BOOL GetIoServerIdFromIP4(IN const char *pIP4, OUT ULONG &nIoId);

EXPORT_C BOOL SyncConfig(OUT ULONG *pErrorCode = NULL);
EXPORT_C BOOL EnableConfigBkSync(BOOL bConfigBkSync, 
								 OUT ULONG *pErrorCode = NULL);

EXPORT_C BOOL Inet_Addr(IN const char* pIPv4, 
						OUT IN_ADDR* pAddr);
EXPORT_C BOOL Inet_Ntoa(IN const IN_ADDR* pAddr, 
						OUT char szIPv4[16]);


EXPORT_C ULONG GetSpecifiedIoServer(IN const ULONG nSrvID, 
									OUT eblib_struct::IOSRV_OBJ* pIoSrv);
EXPORT_C ULONG GetDiskVer(IN const ULONG nDiskID,  
						  OUT ULONG *pErrCode  = NULL);
EXPORT_C ULONG GetCacheHardDiskInfo(IN const ULONG nSrvID,
									IN const ULONG nDeviceID, 
									OUT eblib_struct::SHOW_CACHE_DISK_INFO* pCacheDiskInfo);
EXPORT_C ULONG CancelAliveUpdate(IN const ULONG nPackID,
								 IN const ULONG nNewMode);
EXPORT_C ENUM_HANDLE GetFirstSlvSrv(OUT ULONG *pErrorCode=NULL);
EXPORT_C BOOL GetNextSlvSrv(IN ENUM_HANDLE eHandle,
							OUT eblib_struct::IOSRV_OBJ* pSrvItem);
EXPORT_C ULONG RebootSlvSrv(IN const ULONG nSlvSrvID);
EXPORT_C ULONG ChangeSlvSrvPasswd(IN const ULONG nSlvSrvID,
								  IN const char* pNewPasswd);
EXPORT_C ULONG IsAllowedRestor(IN const ULONG nDiskID);
EXPORT_C ULONG AliveRestore(IN const ULONG nDiskID,
							IN const ULONG nSpecifiedVer,
							IN const ULONG nIoID, 
							IN const ULONG nDiskSize, 
							IN const char* pBaseDiskName,
							IN const char* pBaseDiskPath);
EXPORT_C ULONG DeleteRestorePoint(IN const ULONG nIoID, 
								  IN const ULONG nDiskID, 
								  IN const ULONG nSpecifiedVer);
EXPORT_C ENUM_HANDLE AllocRecordSetHandle();
EXPORT_C ULONG ExecuteSql(IN const char* pchSql, 
						  IN OUT ENUM_HANDLE pRecdSetHandle);
EXPORT_C BOOL  RecordSetMoveFirst(IN ENUM_HANDLE recdSetHandle);
EXPORT_C BOOL  RecordSetMoveNext(IN ENUM_HANDLE recdSetHandle);
EXPORT_C BOOL  GetRecordValue(IN ENUM_HANDLE recdSetHandle,
							  IN int colIndex, 
							  IN char* pchBuffer, 
							  IN INT MaxCount);
EXPORT_C UINT  GetRecordSetColoumns(IN ENUM_HANDLE recdSetHandle);
EXPORT_C void  FreeRecordSetHandle(IN ENUM_HANDLE recdSetHandle);
EXPORT_C ULONG GetComputerCurrentMenu(IN const ULONG nCompID,
					OUT ULONG* pMenuID);//Not implement. Added 9/21 2013

EXPORT_C ULONG DiskIsHaveProxyDisk(IN ULONG nDiskID,
					OUT BOOL &bHaveProxy);
EXPORT_C ENUM_HANDLE GetFirstProxyDiskFromDisk(IN ULONG nDiskID,
						OUT ULONG *pErrCode = NULL);
EXPORT_C BOOL GetNextProxyDiskFromDisk(IN ENUM_HANDLE eHandle,
	OUT eblib_struct::DISK_INFO_OBJ* pDiskItem);
EXPORT_C BOOL EditBaseDiskEx(IN const ULONG nDiskID,
			IN const CHAR *pchNewName,
			IN BOOL bChangeExportDiskName,
			OUT ULONG *pErrorCode = NULL);

EXPORT_C ENUM_HANDLE GetFirstBootServer(OUT ULONG *pErrCode);
EXPORT_C BOOL GetNextBootServer(IN ENUM_HANDLE eHandle,
	OUT ULONG &nID, OUT CHAR *pchName, IN UINT nNameLength,
	OUT CHAR *pchAddress, IN UINT nAddressLength, OUT ULONG &nPort);
EXPORT_C ULONG AddToBootServer(IN CHAR *pchName, IN CHAR* pchAddress, 
	IN ULONG nPort, OUT ULONG *pID);
EXPORT_C ULONG RemoveFromBootServer(IN ULONG ID);
EXPORT_C ULONG ImportDriverFile(IN const CHAR *pchZipFilePath, IN const CHAR *pch7zaFilePath);

//
//删除磁盘
//nID：磁盘ID
//bDelFile:是否删除磁盘文件(TRUE:删除文件)
//执行成功返回EBLIB_SUCCESS，否则返回错误代码
//
EXPORT_C ULONG DeleteDiskEx(IN ULONG nID, BOOL bDelFile);
//
//设置扩展计算机属性
//nID:计算机ID
//COMP_INFO_EX:扩展属性
//执行成功返回EBLIB_SUCCESS，否则返回错误代码
//
EXPORT_C ULONG SetComputerEx(IN ULONG nID, IN eblib_struct::COMP_INFO_EX* pInfo);
//
//读取扩展计算机属性
//nID:计算机ID
//COMP_INFO_EX:扩展属性
//执行成功返回EBLIB_SUCCESS，否则返回错误代码
//
EXPORT_C ULONG GetComputerEx(IN ULONG nID, OUT eblib_struct::COMP_INFO_EX* pInfo);

//
//DISK的[Re-synchronize]
//执行成功返回EBLIB_SUCCESS，否则返回错误代码
//
EXPORT_C ULONG ReSyncDisk(IN ULONG nDisk);

//
//DISK的[Re-Check]
//执行成功返回EBLIB_SUCCESS，否则返回错误代码
//
EXPORT_C ULONG RecheckDisk(IN ULONG nDisk);

//
//设置一些新增加的参数
//OSV_OPTIONS:参数
//
EXPORT_C ULONG SetOptions(IN eblib_struct::OSV_OPTIONS* pSetting);

//
//读取一些新增加的参数
//OSV_OPTIONS:参数
//
EXPORT_C ULONG GetOptions(OUT eblib_struct::OSV_OPTIONS* pSetting);

