#ifndef COMPUTER_H
#define COPUTER_H

#include "route.h"
#include "commonJSON.h"

class CmdCommandComputerResource : public Route::SubResource{
public:
	CmdCommandComputerResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

class MsgCommandComputerResource : public Route::SubResource{
public:
	MsgCommandComputerResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

class CommandComputerResource : public Route::SubResource{
public:
	CommandComputerResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

class StartClientToolsComputerResource : public Route::SubResource{
public:
	StartClientToolsComputerResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

class UpdateComputerResource : public Route::SubResource{
public:
	UpdateComputerResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

class UUIDComputerResource : public Route::ParameterResource{
public:
	UUIDComputerResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

class DeleteComputerResource : public Route::SubResource{
public:
	DeleteComputerResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

class CreateComputerResource : public Route::SubResource{
public:
	CreateComputerResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

class ComputerResource : public Route::SubResource{
public:
	ComputerResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};
class EndUpdateComputerResource : public Route::SubResource{
public:
	EndUpdateComputerResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};
class StartUpdateComputerResource : public Route::SubResource{
public:
	StartUpdateComputerResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

class PoweronCommand : public Route::SubResource{
public:
	PoweronCommand();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

JSON::Value* ComputerToJSON(const OBJ_COMP& info);
JSON::Array* ComputerEnumToJSON();
bool customWakeOnLanComputer(char *mac, in_addr ip, in_addr netmask);
JSON::Value* ExtendedComputerToJSON(ULONG id);

#endif
