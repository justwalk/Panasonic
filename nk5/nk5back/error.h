#ifndef ERROR_H
#define ERROR_H

#include "vhd.h"

void log(char* msg);

void die(const CHAR* msg);
void die();
void WinDie(CHAR* lpszFunction);

void notFound(CHAR* url);
void notImplemented(const CHAR* function);
void missingParameter(const CHAR* param);
void invalidParameter(const CHAR* param);

void SDKError(CHAR* lpszFunction, ULONG code);

#endif
