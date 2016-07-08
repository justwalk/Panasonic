#ifndef COMMONJSON_H
#define COMMONJSON_H

#include "json.h"

#include "error.h"
#include "vhd.h"

//This is generic for all SDK functions that return an enum
template <class T, JSON::Value* toJSON(const T&), BOOL GetNext(IN ENUM_HANDLE EnumObj, T* out)> JSON::Array* enumToJSON(ENUM_HANDLE EnumObj){
	JSON::Array* array = new JSON::Array();

	T info;

	while((GetNext(EnumObj, &info))){
		JSON::Value* value = toJSON(info);
		
		if(value == NULL) {
			delete array;
			return NULL;
		}
		
		array->add(value);
	}

	FreeEnumObject(EnumObj);
	return array;
}

#endif
