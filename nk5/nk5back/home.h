#ifndef HOME_H
#define HOME_H

#include "route.h"
#include "commonJSON.h"

class HomeResource : public Route::SubResource{
public:
	HomeResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

JSON::Array* ComputerEnumToJSON1();

#endif
