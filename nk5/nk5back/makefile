#!CMDSWITCHES +s
.SUFFIXES: .cpp

VHDSDK_LIB="sdk\64\ebLib.lib"
FCGI_LIB="libfcgi\libfcgi.lib"
BOOST="D:\boost_1_55_0"

CL_OPTIONS="/Isdk" "/I$(BOOST)" "/Ilibfcgi\include" /nologo /EHsc /Zi /bigobj /w
LINK_OPTIONS="/LIBPATH:sdk\64" "/LIBPATH:$(BOOST)\stage\lib" /nologo /RELEASE /INCREMENTAL:NO advapi32.lib

EXE_OUT=cgi.exe backup.exe restore.exe
#EXE_OUT=cgi.exe aliveserver.exe
#DLL_OUT=

HTTPD_FOLDER="C:\Program Files (x86)\Apache Software Foundation\Apache2.2\cgi-bin"

all: gendep.exe $(EXE_OUT) $(DLL_OUT) deps
rebuild:
	$(MAKE) /nologo clean all
deploy: all killall
	copy cgi.exe C:\NKV
	copy D:\Alonso\trabajos\NetKaleido\src\nkvclienttools\nk5-nkvclienttools\NkVClientTools\bin\Debug\NkVClientTools.exe client-tools
	copy D:\Alonso\trabajos\NetKaleido\src\nkvclienttools\nk5-nkvclienttools\NkVClientTools\bin\Debug\*.dll client-tools
	copy D:\Alonso\trabajos\NetKaleido\src\nkvclienttools\nk5-nkvclienttools\NkVClientToolsConsole\bin\Debug\NkVClientToolsConsole.exe client-tools
	copy D:\Alonso\trabajos\NetKaleido\src\nkvclienttools\nk5-nkvclienttools\NkVClientToolsAppMonitor\bin\Debug\NkVClientToolsAppMonitor.exe client-tools
#	copy aliveserver.exe $(HTTPD_FOLDER) > NUL

#	start /B /D $(HTTPD_FOLDER) "aliveserver" $(HTTPD_FOLDER)\aliveserver.exe >NUL 2>NUL

killall:
	-taskkill /im aliveserver.exe /f /t 2>NUL >NUL
	-taskkill /im cgi.exe /f /t 2>NUL >NUL

.cpp.obj:
	IF EXIST $@	type <<
Building $@ because of $?
<<
	IF NOT EXIST "$(<R).d" copy NUL "$(<R).d" >NUL
	-cl $(CL_OPTIONS) @"$(<R).d" /c "$<" /Fo"$@" /showIncludes >"$(<R).tdep" 2>NUL
	gendep "$(<R)"

#$(DLL_OUT) $(DLL_OUT:.dll=.lib):
#	IF EXIST $@ echo Building $(@:.lib=.dll) because of $?
#	link $(LINK_OPTIONS) $(**) /DLL /OUT:"$(@R).dll" /IMPLIB:"$(@R).lib"
#	echo $(@:.lib=.dll)

$(EXE_OUT):
	IF EXIST $@	type <<
Building $@ because of $?
<<
	echo $@
	link $(LINK_OPTIONS) $(**) /OUT:"$@"

clean:
	-del *.obj 2>NUL
	-del *.exe 2>NUL
	-del *.dll 2>NUL
	-del *.lib 2>NUL
	-del *.exp 2>NUL
	-del *.dep 2>NUL
	-del *.ilk 2>NUL
	-del *.pdb 2>NUL
	copy NUL deps.tmp > NUL

cgi.exe: main.obj route.obj error.obj login.obj json.obj group.obj computer.obj diag.obj menu.obj pack.obj ioserver.obj basedisk.obj disk.obj settings.obj alive.obj directory.obj output.obj file.obj home.obj $(VHDSDK_LIB) $(FCGI_LIB)
#cgi.exe: main.obj route.obj error.obj login.obj json.obj group.obj computer.obj alive.obj onlineinfo.obj diag.obj ioserver.obj menu.obj basedisk.obj template.obj pack.obj disk.obj $(VHDSDK_LIB)
aliveserver.exe: aliveserver.obj error.obj login.obj $(VHDSDK_LIB)

backup.exe: backup.obj loginNoCGI.obj $(VHDSDK_LIB)
restore.exe: restore.obj loginNoCGI.obj $(VHDSDK_LIB)

deps:
	type *.dep >deps.tmp 2>NUL
gendep.exe: gendep.obj
	link $(LINK_OPTIONS) $(**F) /OUT:$@
!INCLUDE deps.tmp