#include "json.h"

#include <sstream>

namespace JSON{
	//Value
	Value::~Value(){
	}
	
	void Value::render() const {
		renderStream(FCGI_stdout);
	}

	//String
	String::String(const char* from) : m_string(from) {}
	
	//String
	String::String(const std::string& from){
		m_string = from;
	}

	void String::renderStream(FCGI_FILE* out) const{
		FCGI_fputs("\"", out);
		std::string::const_iterator it;
		for(it = m_string.begin(); it!= m_string.end(); it++)
			switch(*it) {
				case '"':
					FCGI_fputs("\"", out);
					break;
				case '\\':
					FCGI_fputs("\\\\", out);
					break;
				default:
					FCGI_fputc(*it, out);
			}
		FCGI_fputs("\"", out);
	}

	Value* String::clone() const{
		return new String(m_string);
	}

	String::~String(){
	}

	//Boolean
	Boolean::Boolean(bool from){
		m_bool = from;
	}

	void Boolean::renderStream(FCGI_FILE* out) const{
		if(m_bool)
			FCGI_fputs("true", out);
		else
			FCGI_fputs("false", out);
	}

	Value* Boolean::clone() const{
		return new Boolean(m_bool);
	}

	Boolean::~Boolean(){
	}

	//Integer
	Integer::Integer(uint64_t from){
		m_int = from;
	}

	void Integer::renderStream(FCGI_FILE* out) const{
		std::ostringstream oss;
		oss << m_int;
		
		FCGI_fputs(oss.str().c_str(), out);
	}

	Value* Integer::clone() const{
		return new Integer(m_int);
	}

	Integer::~Integer(){
	}
	
	//IP
	IP::IP(IN_ADDR from){
		m_ip = from;
	}
	
	IP::IP(ULONG from){
		m_ip.S_un.S_addr = from;
	}
	
	IP::IP(const std::string& from){
		std::string str(from.begin(), from.end());
		m_ip.S_un.S_addr = inet_addr(str.c_str());
	}

	void IP::renderStream(FCGI_FILE* out) const{
		FCGI_fprintf(out, "\"%s\"", inet_ntoa(m_ip));
	}

	Value* IP::clone() const{
		return new IP(m_ip);
	}

	IP::~IP(){
	}

	//Object
	Object::Object(){
	}

	Object::Object(const std::map<Value*,Value*>& data){
		std::map<Value*,Value*>::const_iterator it;
		for (it = data.begin(); it != data.end(); it++){
			m_data[(*it).first->clone()] = (*it).second->clone();
		}
	}

	void Object::renderStream(FCGI_FILE* out) const{
		FCGI_fputs("{", out);
		std::map<Value*,Value*>::const_iterator it;
		bool first = true;
		for (it = m_data.begin(); it != m_data.end(); it++){
			if(first)
				first = false;
			else
				FCGI_fputs(",", out);
			(*it).first->renderStream(out);
			FCGI_fputs(":", out);
			(*it).second->renderStream(out);
		}
		FCGI_fputs("}", out);
	}

	Value* Object::clone() const{
		return new Object(m_data);
	}
	
	Object::~Object(){
		std::map<Value*,Value*>::iterator it;
		for (it = m_data.begin(); it != m_data.end(); it++){
			delete (*it).first;
			delete (*it).second;
		}
	}
	
	void Object::add(Value* key, Value* value){
		m_data[key] = value;
	}
	
	void Object::add(const Value& key,const Value& value){
		m_data[key.clone()] = value.clone();
	}
	
	//Array
	
	Array::Array(){
	}
	
	Array::Array(const std::vector<Value*>& data){
		std::vector<Value*>::const_iterator it;
		for (it = data.begin(); it != data.end(); it++){
			m_data.push_back((*it)->clone());
		}
	}
	
	void Array::renderStream(FCGI_FILE* out) const{
		FCGI_fputs("[", out);
		std::vector<Value*>::const_iterator it;
		bool first = true;
		for (it = m_data.begin(); it != m_data.end(); it++){
			if(first)
				first = false;
			else
				FCGI_fputs(",", out);
			(*it)->renderStream(out);
		}
		FCGI_fputs("]", out);
	}
	
	Value* Array::clone() const{
		return new Array(m_data);
	}
	
	Array::~Array(){
		std::vector<Value*>::iterator it;
		for (it = m_data.begin(); it != m_data.end(); it++){
			delete (*it);
		}
	}
	
	void Array::add(Value* element){
		m_data.push_back(element);
	}
	
	void Array::add(const Value& element){
		m_data.push_back(element.clone());
	}
}