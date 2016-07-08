@echo OFF
SETLOCAL ENABLEDELAYEDEXPANSION
set FILE=%1

rem Remove quotes around filename
SET FILE=###%FILE%###
SET FILE=%FILE:"###=%
SET FILE=%FILE:###"=%
SET FILE=%FILE:###=%

echo|set /p=%FILE%.obj: > %FILE%.dep
FOR /F "tokens=3,4 delims=:" %%X IN (%FILE%.tdep) do (
	for /f "tokens=* delims= " %%a in ("%%X:%%Y") do set DEP=%%a
	echo|set /p=^""^" >> %FILE%.dep
	echo|set /p="!DEP!" >> %FILE%.dep
	echo|set /p=^"" ^" >> %FILE%.dep
)
echo. >> %FILE%.dep
del %FILE%.tdep