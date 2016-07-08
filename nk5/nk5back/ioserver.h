#ifndef IOSERVER_H
#define IOSERVER_H

#include "route.h"
#include "commonJSON.h"

class IOServerResource : public Route::SubResource{
public:
	IOServerResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

class DeleteIOServerResource : public Route::SubResource{
public:
	DeleteIOServerResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

class UpdateIOServerResource : public Route::SubResource{
public:
	UpdateIOServerResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

class RestartIOServerResource : public Route::SubResource{
public:
	RestartIOServerResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};
// 新增方法  ioServer停止
class StopIOServerResource : public Route::SubResource{
public:
	StopIOServerResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};
//新增方法 bootServer重启
class RestartBOOTServerResource : public Route::SubResource{
public:
	RestartBOOTServerResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

class UUIDIOServerResource : public Route::ParameterResource{
public:
	UUIDIOServerResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

class CreateIOServerResource : public Route::SubResource{
public:
	CreateIOServerResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};


class IOServerChannelResource : public Route::SubResource{
public:
	IOServerChannelResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

class DeleteIOServerChannelResource : public Route::SubResource{
public:
	DeleteIOServerChannelResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

class UpdateIOServerChannelResource : public Route::SubResource{
public:
	UpdateIOServerChannelResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

class UUIDIOServerChannelResource : public Route::ParameterResource{
public:
	UUIDIOServerChannelResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

class CreateIOServerChannelResource : public Route::SubResource{
public:
	CreateIOServerChannelResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

//xiongpanan add start 2016/4/18
class GetIOServerAboutInfoResource : public Route::SubResource{
public:
	GetIOServerAboutInfoResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};
//xiongpanan add end 2016/4/18

class ServerScript : public Route::SubResource{
public:
	ServerScript();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

JSON::Value* IOServerToJSON(const IOSRV_OBJ& info);
JSON::Value* IOServerChannelToJSON(const CHANNEL_OBJ& info);

JSON::Array* IOServerEnumToJSON();
JSON::Array* IOServerChannelEnumToJSON(ULONG iid);
//xiongpanan add start 2016/4/18
JSON::Object* GetIOServerAboutInfoToJSON();
//xiongpanan add end 2016/4/18
#endif
