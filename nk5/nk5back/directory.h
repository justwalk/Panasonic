#ifndef DIRECTORY_H
#define DIRECTORY_H

#include "route.h"
#include "commonJSON.h"

class DirectoryResource : public Route::SubResource{
public:
	DirectoryResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

class UpdateDirectoryResource : public Route::SubResource{
public:
	UpdateDirectoryResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

class UUIDDirectoryResource : public Route::ParameterResource{
public:
	UUIDDirectoryResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

class DeleteDirectoryResource : public Route::SubResource{
public:
	DeleteDirectoryResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

class CreateDirectoryResource : public Route::SubResource{
public:
	CreateDirectoryResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

JSON::Value* DirectoryToJSON(const DIR_OBJ& info);

JSON::Array* DirectoryEnumToJSON(ULONG iid, ULONG type);

#endif