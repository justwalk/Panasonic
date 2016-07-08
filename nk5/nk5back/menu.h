#ifndef MENU_H
#define MENU_H

#include "route.h"
#include "commonJSON.h"

void deleteMenu(ULONG id);

class MenuResource : public Route::SubResource{
public:
	MenuResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

class DeleteMenuResource : public Route::SubResource{
public:
	DeleteMenuResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

class UUIDMenuResource : public Route::ParameterResource{
public:
	UUIDMenuResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};
class CreateMenuResource : public Route::SubResource{
public:
	CreateMenuResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};
//xiongpanan add start 2016/4/12
class OperationMenuResource : public Route::SubResource{
public:
	OperationMenuResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};
 //xiongpanan add end 2016/4/12

class UpdateMenuResource : public Route::SubResource{
public:
	UpdateMenuResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

class SetDefaultMenuResource : public Route::SubResource{
public:
	SetDefaultMenuResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};
JSON::Value* MenuToJSON(const MENU_OBJ& info);
JSON::Value* ExtendedMenuToJSON(ULONG id);
JSON::Array* MenuEnumToJSON(ULONG cid);

#endif
