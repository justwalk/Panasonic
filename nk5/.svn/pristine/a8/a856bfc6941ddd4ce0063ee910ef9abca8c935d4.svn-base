#ifndef JSON_H
#define JSON_H

#define NO_FCGI_DEFINES

#include <fcgi_stdio.h>

#include <vector>
#include <string>
#include <map>

#include <cstdint>

#include "WinSock2.h"

#pragma comment(lib, "Ws2_32.lib")

namespace JSON{

	class Value{
	public:
		// Create a JSON representation of the Objects stored
		// It does not create a string as it will break when
		// crossing the DLL boundry
		virtual void renderStream(FCGI_FILE*) const = 0;
		void render() const;
		// Clone the values stored
		virtual Value* clone() const = 0;
		virtual ~Value();
	};

	class String: public Value{
	public:
		String(const char* from);
		String(const std::string& from);
		virtual void renderStream(FCGI_FILE*) const;
		virtual Value* clone() const;
		virtual ~String();
	private:
		std::string m_string;
	};

	class Boolean: public Value{
	public:
		Boolean(bool from);
		virtual void renderStream(FCGI_FILE*) const;
		virtual Value* clone() const;
		virtual ~Boolean();
	private:
		bool m_bool;
	};

	class Integer: public Value{
	public:
		Integer(uint64_t from);
		virtual void renderStream(FCGI_FILE*) const;
		virtual Value* clone() const;
		virtual ~Integer();
	private:
		uint64_t m_int;
	};
	
	class IP: public Value{
	public:
		IP(IN_ADDR from);
		IP(ULONG from);
		IP(const std::string& from);
		virtual void renderStream(FCGI_FILE*) const;
		virtual Value* clone() const;
		virtual ~IP();
	private:
		IN_ADDR m_ip;
	};

	class Object: public Value{
	public:
		Object();
		// Initialize from a map (makes a deep copy using clone)
		Object(const std::map<Value*,Value*>& data);
		virtual void renderStream(FCGI_FILE*) const;
		virtual Value* clone() const;
		virtual ~Object();
	public:
		// Makes it possible to add values to the internal map,
		// The pointers are not added, clone is used on them
		void add(Value* key, Value* value);
		void add(const Value& key,const Value& value);
	private:
		std::map<Value*,Value*> m_data;
	};

	class Array: public Value{
	public:
		Array();
		// Initialize from a vector (makes a deep copy using clone)
		Array(const std::vector<Value*>& data);
		virtual void renderStream(FCGI_FILE*) const;
		virtual Value* clone() const;

		virtual ~Array();
	public:
		// Makes it possible to add values to the internal vector,
		// The pointers are not added, clone is used on them
		void add(Value* element);
		void add(const Value& element);
	private:
		std::vector<Value*> m_data;
	};
}

#endif
