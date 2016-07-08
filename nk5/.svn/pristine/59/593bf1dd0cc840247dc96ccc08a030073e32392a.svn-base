#ifndef FILE_H
#define FILE_H

#include "route.h"
#include "commonJSON.h"

class FileResource : public Route::SubResource{
public:
	FileResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

JSON::Value* FileToJSON(const GET_FILE_OBJ& info);

JSON::Array* FileEnumToJSON(ULONG iid, const char* path);

#endif