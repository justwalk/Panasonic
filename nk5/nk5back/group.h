#ifndef GROUP_H
#define GROUP_H

#include "route.h"
#include "commonJSON.h"

class AddCommandGroupResource : public Route::SubResource{
public:
	AddCommandGroupResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

class UpdateGroupResource : public Route::SubResource{
public:
	UpdateGroupResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

class StartGroupResource : public Route::SubResource{
public:
	StartGroupResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

class RestartGroupResource : public Route::SubResource{
public:
	RestartGroupResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

class StopGroupResource : public Route::SubResource{
public:
	StopGroupResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

class SendMsgGroupResource : public Route::SubResource{
public:
	SendMsgGroupResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

class SendCmdGroupResource : public Route::SubResource{
public:
	SendCmdGroupResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

class LogoutGroupResource : public Route::SubResource{
public:
	LogoutGroupResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

class UUIDGroupResource : public Route::ParameterResource{
public:
	UUIDGroupResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

class CreateGroupResource : public Route::SubResource{
public:
	CreateGroupResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

class DestroyGroupResource : public Route::SubResource{
public:
	DestroyGroupResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

class GroupResource : public Route::SubResource{
public:
	GroupResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

class PoweronCommandGroup : public Route::SubResource{
public:
	PoweronCommandGroup();
	void virtual run(const std::map<std::string, std::string>& params) const;
};


JSON::Value* GroupToJSON(const GRP_OBJ& info);
JSON::Array* GroupEnumToJSON();
JSON::Value* ExtendedGroupToJSON(ULONG id);

#endif
