#ifndef VHD_H
#define VHD_H

#define NO_FCGI_DEFINES

#include <fcgi_stdio.h>

//needs to be before windows.h
#include "WinSock2.h"

//vhd includes need these included before them
#include <Windows.h>

//vhd includes

#include "idata.h"
#include "idef.h"
#include "ebExport.h"
#include "ebError.h"

using namespace eblib_struct;

/*
	There is no function like this in the SDK and the macro they provide makes linking fail
*/
inline BOOL GuidToStr(GUID *pGuid, CHAR *pGuidStr, ULONG ulGuidLen){
		if( pGuid == NULL || pGuidStr == NULL || ulGuidLen < 36 ) return FALSE;

		sprintf_s(pGuidStr, ulGuidLen, "%08X-%04X-%04X-%02X%02X-%02X%02X%02X%02X%02X%02X", pGuid->Data1, pGuid->Data2, pGuid->Data3, pGuid->Data4[0],\
			pGuid->Data4[1], pGuid->Data4[2], pGuid->Data4[3], pGuid->Data4[4], pGuid->Data4[5], pGuid->Data4[6], pGuid->Data4[7]);

		return TRUE;
}

/*
	Regexes to check the parameters
*/

#include <boost/regex.hpp>

static const boost::regex macRegex("[A-F0-9][A-F0-9]:[A-F0-9][A-F0-9]:[A-F0-9][A-F0-9]:[A-F0-9][A-F0-9]:[A-F0-9][A-F0-9]:[A-F0-9][A-F0-9]");
static const boost::regex ipRegex("(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)");
static const boost::regex uuidRegex("[A-F0-9]{8}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{12}");
static const boost::regex numberRegex("(0)|([1-9][0-9]*)");
static const boost::regex booleanRegex("(false)|(true)");

/*
	Clamp the length of a string
*/

inline std::string clamp(std::string str, size_t len){
	if(str.size() > len - 1)
		str.erase(str.begin() + len - 1, str.end());
	return str;
}

//for alive heartbeat

#define BOOTM_SIGNAL_HEARTBEAT 100 //probably unused

#define MAX_IP 16
#define MAX_NAME 255

//useful for params parameter
#define CHECK_PARAM(X) \
	if(params.find(X) == params.end()) \
		return missingParameter(X); \
	if(params.find(X)->second.empty()) \
		return invalidParameter(X);

#define CHECK_PARAM_REGEX(X, Y) \
	CHECK_PARAM(X) \
	if(!boost::regex_match(params.find(X)->second, Y)) \
		return invalidParameter(X);

//assume structure is named info
#define CopyString(X, Y) \
	{ \
		CHECK_PARAM(Y); \
		std::string tmp = clamp(params.find(Y)->second, sizeof(info.X)); \
		strcpy(info.X, tmp.c_str()); \
	}

#define CopyStringValidated(X, Y, Z) \
	{ \
		CHECK_PARAM_REGEX(Y, Z); \
		std::string tmp = clamp(params.find(Y)->second, sizeof(info.X)); \
		strcpy(info.X, tmp.c_str()); \
	}

#define CopyInteger(X, Y) \
	{ \
		CHECK_PARAM_REGEX(Y, numberRegex); \
		ULONG tmp; \
		std::istringstream(params.find(Y)->second) >> tmp; \
		info.X = tmp; \
	}

#define CopyBoolean(X, Y) \
	{ \
		CHECK_PARAM_REGEX(Y, booleanRegex); \
		info.X = params.find(Y)->second=="true"; \
	}

#define CopyIP(X, Y) \
	{ \
		CHECK_PARAM_REGEX(Y, ipRegex); \
		info.X.S_un.S_addr = inet_addr(params.find(Y)->second.c_str()); \
	}

//extract integer

#include <sstream>

inline ULONG StrToInt(const std::string& from){
	ULONG id;
	
	std::istringstream(from) >> id;
	
	return id;
}

#define GetInt(X) StrToInt(params.find(#X)->second)

//Missing enums


typedef enum {
	PACK_TYPE_SIMPLE = 0, 
	PACK_TYPE_BALANCE = 1, 
	PACK_TYPE_CONCURRENT = 2, 
	// Missiong
	PACK_TYPE_STORAGE = 4, 
	PACK_TYPE_SMART = 5
} PACK_TYPE;

typedef enum {
	PACK_MODE_UNDO = 0,
	PACK_MODE_RW = 1,
	PACK_MODE_UPDATE = 2,
	PACK_MODE_RW_READY = 3,
	PACK_MODE_UNDO_READY = 4,
	PACK_MODE_UPDATE_2 = 5,
	PACK_MODE_UPDATE_ALIVE = 6
} PACK_MODE;


typedef enum {
	DISK_TYPE_BASE = 0,
	DISK_TYPE_EXPORT = 1,
	DISK_TYPE_RESTOR_POINT = 2,
	DISK_TYPE_STORAGE = 3,
	DISK_TYPE_SNAPSHOT = 4,
	DISK_TYPE_PROXY = 5,
	DISK_TYPE_ALIVE = 6,
	DISK_TYPE_CACHE = 7,
	DISK_TYPE_DELETE_PENDING = 8,
	DISK_TYPE_EXISTING = 100
} DISK_TYPE;


typedef enum {
	ACNT_FLAG_DISABLE = ((ULONG)0x00000001),
	ACNT_FLAG_ENABLE_MENU = ((ULONG)0x00000002),
	ACNT_FLAG_DISABLE_USB_STOR =((ULONG)0x00000004),
	ACNT_FLAG_BOOT_RENAME = ((ULONG)0x00000008),
	ACNT_FLAG_WMEMCH = ((ULONG)0x00000010),
	ACNT_FLAG_LDC_SYNC = ((ULONG)0x00000020),
	ACNT_FLAG_SYNC_TIME = ((ULONG)0x00000040),
	ACNT_FLAG_AD = 	((ULONG)0x00000080),
	ACNT_FLAG_PRIVATE = ((ULONG)0x00000100),
	ACNT_FLAG_BOOT_MASK = ((ULONG)0x00000600),
	ACNT_FLAG_BOOT_VIRTUAL = ((ULONG)0x00000000),
	ACNT_FLAG_BOOT_LOCAL = ((ULONG)0x00000200),
	ACNT_FLAG_BOOT_CACHE = ((ULONG)0x00000600),
	ACNT_FLAG_BOOT_SELECT = ((ULONG)0x00000400),
	ACNT_FLAG_DISABLE_USB_DEV =((ULONG)0x00000800),
	ACNT_FLAG_UPDATE_MODE = ((ULONG)0x00001000),
	ACNT_FLAG_8021X = 	((ULONG)0x00002000),
	ACNT_FLAG_REG_PERSIST = ((ULONG)0x00004000),
	ACNT_FLAG_FILE_PERSIST = ((ULONG)0x00008000),
	ACNT_FLAG_SSID_PERSIST = ((ULONG)0x00010000),
	ACNT_FLAG_NET_SECLUDE = ((ULONG)0x00020000),
	ACNT_FLAG_MULTI_AD = ((ULONG)0x00040000),
	ACNT_FLAG_UPDT_BOOTIMG = ((ULONG)0x00080000)
} ACNT_FLAG;

typedef enum {
	BOOT_TYPE_MASK = ACNT_FLAG_BOOT_MASK,
	BOOT_TYPE_VIRTUAL = ACNT_FLAG_BOOT_VIRTUAL,
	BOOT_TYPE_LOCAL = ACNT_FLAG_BOOT_LOCAL,
	BOOT_TYPE_CACHE = ACNT_FLAG_BOOT_CACHE,
	BOOT_TYPE_SELECT = ACNT_FLAG_BOOT_SELECT
} BOOT_TYPE;

typedef enum {
	DIRECTORY_TYPE_EXPORT = 0,
	DIRECTORY_TYPE_STORAGE = 1,
	DIRECTORY_TYPE_BASE_DISK = 2
} DIRECTORY_TYPE;

static inline std::string errorToString(ULONG error) {
	switch(error) {
		case EBLIB_ERR_INIT_SOCKET:
			return "init socket";
		case EBLIB_ERR_INIT_LIB:
			return "init lib";
		case EBLIB_ERR_IP_EMPTY:
			return "ip empty";
		case EBLIB_ERR_IP_FAILED:
			return "ip failed";
		case EBLIB_ERR_ADD_CLIENT:
			return "add client";
		case EBLIB_ERR_CONNECT:
			return "connect";
		case EBLIB_ERR_USER_PASS:
			return "invalid user/password";
		case EBLIB_ERR_MEMORY:
			return "memory";
		case EBLIB_EXEC_SQL_FAILED:
			return "sql";
		case EBLIB_ERR_RECORDSET:
			return "recordset";
		case EBLIB_INVALID_INPUT:
			return "invalid input";
		case EBLIB_INVALID_HANDLE:
			return "invalid enum handle";
		case EBLIB_INVALID_SEND:
			return "invalid send";
		case EBLIB_INVALID_RECV:
			return "invalid recv";
		case EBLIB_ERR_DEL_DISKWITHSUB:
			return "disk has children";
		case EBLIB_INVALID_DISKVER:
			return "invalid disk version";
		case EBLIB_INVALID_ACCESS:
			return "access denied";
		case EBLIB_USERNAME_EXIST:
			return "username exists";
		case EBLIB_ERR_PST_EMPTY:
			return "passport empty";
		case EBLIB_ERR_PSD_EMPTY:
			return "password empty";
		case EBLIB_OUTOF_MAXPACK:
			return "out of max pack";
		case EBLIB_EMPTY_RECORDSET:
			return "empty recordset";
		case EBLIB_GROUPNAME_EXIST:
			return "groupname exists";
		case EBLIB_COMPUTERNAME_EXIST:
			return "computer name exists";
		case EBLIB_MENUNAME_EMPTY:
			return "menu name empty";
		case EBLIB_INVALID_PACKINDEX:
			return "pack index is out of range";
		case EBLIB_MAC_EXIST:
			return "mac exists";
		case EBLIB_INVALID_USERGROUPID:
			return "invalid user group id";
		case EBLIB_INVALID_COMPGROUPID:
			return "invalid user compueter id";
		case EBLIB_DISK_NOTEXIST:
			return "disk does not exist";
		case EBLIB_EMPTY_PACK:
			return "pack empty";
		case EBLIB_BASIC_DISK_LOCKED:
			return "basic disk locked";
		case EBLIB_INVALID_PACK:
			return "invalid pack";
		case EBLIB_PACK_ALREADY_UPDATE:
			return "pack already updated";
		case EBLIB_DISK_ALREADY_UPDATE:
			return "disk already updated";

		case EBLIB_SUCCESS:
			return "success";
		case EBLIB_FAILED:
			return "failed";
		case EBLIB_NOT_IMPLEMENT:
			return "not implemented";
	
		case EBLIB_UNKNOWN:
			return "unknown";
		default:
			return "undefined";
	}
}

#endif
