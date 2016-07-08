#ifndef ALIVE_H
#define ALIVE_H

#include "route.h"
#include "commonJSON.h"

class AliveResource : public Route::SubResource{
public:
	AliveResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

JSON::Value* SignaltoJSON(const PIMSG& info, const ULONG type);

#endif
