#include "vhd.h"

#include <iostream>
#include <vector>

#include "login.h"
#include "error.h"

#include <aclapi.h>

typedef struct
{
   OVERLAPPED oOverlap;
   HANDLE hPipeInst;
} PIPEINST, *LPPIPEINST;

std::vector<HANDLE> pipes;
HANDLE hPipe;


BOOL CreateAndConnectInstance(LPOVERLAPPED lpoOverlap){
	/*
		Need to allow IIS to read from the named pipe
	*/
	SECURITY_ATTRIBUTES sa;
	EXPLICIT_ACCESS ea;
	PSECURITY_DESCRIPTOR pSD = NULL;

	ZeroMemory(&ea, sizeof(EXPLICIT_ACCESS));
    ea.grfAccessPermissions = MAXIMUM_ALLOWED;
    ea.grfAccessMode = GRANT_ACCESS;
    ea.grfInheritance= NO_INHERITANCE;
    ea.Trustee.TrusteeForm = TRUSTEE_IS_NAME;
    ea.Trustee.TrusteeType = TRUSTEE_IS_GROUP;
    ea.Trustee.ptstrName  = (LPTSTR) TEXT("IIS_IUSRS"); // IIS processes

	PACL pACL = NULL;
	if(!SetEntriesInAcl(1, &ea, NULL, &pACL))
		WinError("SetEntriesInAcl");
	pSD = LocalAlloc(LPTR, SECURITY_DESCRIPTOR_MIN_LENGTH);
	if(!InitializeSecurityDescriptor(pSD, SECURITY_DESCRIPTOR_REVISION))
		WinError("InitializeSecurityDescriptor");
	if(!SetSecurityDescriptorDacl(pSD, TRUE, pACL, FALSE))
		WinError("SetSecurityDescriptorDacl");

	sa.nLength = sizeof (SECURITY_ATTRIBUTES);
    sa.lpSecurityDescriptor = pSD;
    sa.bInheritHandle = FALSE;

	LPTSTR lpszPipename = TEXT("\\\\.\\pipe\\mynamedpipe");
	hPipe = CreateNamedPipe(
		lpszPipename,				// pipe name
		PIPE_ACCESS_DUPLEX |		// read/write access
		FILE_FLAG_OVERLAPPED,		// overlapped mode
		PIPE_TYPE_MESSAGE |			// message-type pipe
		PIPE_READMODE_MESSAGE |		// message read mode
		PIPE_WAIT,					// blocking mode
		PIPE_UNLIMITED_INSTANCES,	// unlimited instances
		sizeof(VHD_BOOTM_SIGNAL),	// output buffer size
		sizeof(VHD_BOOTM_SIGNAL),	// input buffer size
		0,							// client time-out
		&sa);						//allow IIS to do anything with the pipe

	LocalFree(pACL);
	LocalFree(pSD);

	if (hPipe == INVALID_HANDLE_VALUE)
		WinError("CreateNamedPipe");
	BOOL fPendingIO = FALSE;
	if(ConnectNamedPipe(hPipe, lpoOverlap))
		WinError("ConnectNamedPipe");
	switch (GetLastError()){
		case ERROR_IO_PENDING:
			fPendingIO = TRUE;
			break;
		case ERROR_PIPE_CONNECTED:
			if (!SetEvent(lpoOverlap->hEvent))
				WinError("SetEvent");
			break;
      default:
         WinError("CreateNamedPipe");
   }
   return fPendingIO;
}

VOID CALLBACK APCProc(__in  ULONG_PTR dwParam){
	VHD_BOOTM_SIGNAL* msg = (VHD_BOOTM_SIGNAL*) dwParam;
	DWORD bw;
	std::vector<std::vector<HANDLE>::iterator> tbd;
	std::vector<HANDLE>::iterator it;
	for(it = pipes.begin();it!= pipes.end();it++)
		if(!WriteFile(*it, (LPCVOID)msg, sizeof(VHD_BOOTM_SIGNAL), &bw, NULL))
			tbd.push_back(it);
	while(tbd.size() > 0){
		CloseHandle(*tbd.back());
		pipes.erase(tbd.back());
		tbd.pop_back();
	}
	delete msg;
}

DWORD WINAPI PipeServer( LPVOID lpParam ) {
	OVERLAPPED oConnect;
	HANDLE hConnectEvent;
	BOOL fPendingIO;
	DWORD dwWait, cbRet;
	LPPIPEINST lpPipeInst;

	hConnectEvent = CreateEvent(NULL, TRUE, TRUE, NULL);
	if(!hConnectEvent)
		WinError("CreateEvent");
	oConnect.hEvent = hConnectEvent;
	fPendingIO = CreateAndConnectInstance(&oConnect);
	while(1){
		dwWait = WaitForSingleObjectEx(hConnectEvent, INFINITE, TRUE);
		switch(dwWait){
			case 0:
				if(fPendingIO){
					if(!GetOverlappedResult(hPipe, &oConnect, &cbRet, FALSE))
						WinError("ConnectNamedPipe");
					pipes.push_back(hPipe);
				}
				lpPipeInst = (LPPIPEINST) GlobalAlloc(GPTR, sizeof(PIPEINST));
				lpPipeInst->hPipeInst = hPipe;
				fPendingIO = CreateAndConnectInstance(&oConnect);
				break;
			case WAIT_IO_COMPLETION:
				break;
			default:
				WinError("WaitForSingleObjectEx");
		}
	}
}

int main(){
	HANDLE ServerThread;
	ServerThread = CreateThread(NULL, 0, PipeServer, NULL, 0, NULL);

	BOOTMAPI::CORE* bootmgr = login();

	ULONGLONG EnumObj;
	VHD_BOOTM_SIGNAL* info;
	ULONG num=0;

	while(1){
		info = new VHD_BOOTM_SIGNAL;
		bootmgr->Alive(&EnumObj);
		while((bootmgr->EnumNext(EnumObj, (BYTE*)info, sizeof(VHD_BOOTM_SIGNAL), 1, &num)) && num ){
			QueueUserAPC(APCProc, ServerThread, (ULONG_PTR)info);
			info = new VHD_BOOTM_SIGNAL;
		}
		delete info;
		bootmgr->EnumRelease(EnumObj);
		SleepEx(500,TRUE);

		info = new VHD_BOOTM_SIGNAL;
		info->sig_type = BOOTM_SIGNAL_HEARTBEAT;
		info->sig_time = time(NULL);
		QueueUserAPC(APCProc, ServerThread, (ULONG_PTR)info);
	}

	logout(bootmgr);

	return 0;
}
