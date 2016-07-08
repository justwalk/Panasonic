#ifndef BASEDISK_H
#define BASEDISK_H

#include "route.h"
#include "commonJSON.h"

class BaseDiskResource : public Route::SubResource{
public:
	BaseDiskResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

class DeleteBaseDiskResource : public Route::SubResource{
public:
	DeleteBaseDiskResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

class UUIDBaseDiskResource : public Route::ParameterResource{
public:
	UUIDBaseDiskResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

class CreateBaseDiskResource : public Route::SubResource{
public:
	CreateBaseDiskResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};
class CopyBaseDiskResource : public Route::SubResource{
public:
	CopyBaseDiskResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

class UpdateBaseDiskResource : public Route::SubResource{
public:
	UpdateBaseDiskResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

class RevertBaseDiskResource : public Route::SubResource{
public:
	RevertBaseDiskResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

class DropBaseDiskResource : public Route::SubResource{
public:
	DropBaseDiskResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

class MergeBaseDiskResource : public Route::SubResource{
public:
	MergeBaseDiskResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};


class DiskRestore : public Route::SubResource{
public:
	DiskRestore();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

class DiskRollBack : public Route::SubResource{
public:
	DiskRollBack();
	void virtual run(const std::map<std::string, std::string>& params) const;
};
class DiskMerge : public Route::SubResource{
public:
	DiskMerge();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

class ProxyToBaseDisk : public Route::SubResource{
public:
	ProxyToBaseDisk();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

class BaseDiskList : public Route::SubResource{
public:
	BaseDiskList();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

class ProxyDiskSync : public Route::SubResource{
public:
	ProxyDiskSync();
	void virtual run(const std::map<std::string, std::string>& params) const;
};
class DiskSyncCreate : public Route::SubResource{
public:
	DiskSyncCreate();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

class DiskReSync : public Route::SubResource{
public:
	DiskReSync();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

class DiskReCheck : public Route::SubResource{
public:
	DiskReCheck();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

JSON::Value* DiskToJSON(const DISK_INFO_OBJ& info);
JSON::Array* BaseDiskEnumToJSON(ULONG iid);
JSON::Array* SnapshotEnumToJSON(ULONG bdid);
JSON::Array* BaseDiskEnumToJSON(ULONG iid, ULONG pid);
JSON::Array* BaseDiskRestoreToJSON(ULONG iid);
JSON::Array* BaseDiskComputerList(ULONG iid);
JSON::Object* DiskSyncToJSON(ULONG iid);

#endif
