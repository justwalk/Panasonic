#ifndef SETTINGS_H
#define SETTINGS_H

#include "route.h"
#include "commonJSON.h"

class SettingsResource : public Route::SubResource{
public:
	SettingsResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

class SettingsUpdateResource : public Route::SubResource{
public:
	SettingsUpdateResource();
	void virtual run(const std::map<std::string, std::string>& params) const;
};

JSON::Object* SettingsToJSON(const SETUP& info);

#endif