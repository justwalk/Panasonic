#ifndef DISK_H
#define DISK_H

#include "route.h"
#include "commonJSON.h"

void deleteDisk(ULONG did);

class DiskResource : public Route::SubResource{
public:
	DiskResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

class DeleteDiskResource : public Route::SubResource{
public:
	DeleteDiskResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

class UUIDDiskResource : public Route::ParameterResource{
public:
	UUIDDiskResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

class CreateDiskResource : public Route::SubResource{
public:
	CreateDiskResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

class UpdateDiskResource : public Route::SubResource{
public:
	UpdateDiskResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

JSON::Value* DiskToJSON(const DISK_INFO_OBJ& info);
JSON::Array* DiskEnumToJSON(ULONG pid);

#endif