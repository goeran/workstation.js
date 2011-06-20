#include "WorkstationPrototype.h"
#include "Workstation.h"

#include <QtScript/QScriptValue>
#include <QtScript/QScriptEngine>

Q_DECLARE_METATYPE(Workstation*)
Q_DECLARE_METATYPE(Screen*)

WorkstationPrototype::WorkstationPrototype(QObject *parent)
  : QObject(parent)
{
}

WorkstationPrototype::~WorkstationPrototype()
{
}

Workstation* WorkstationPrototype::getWorkstation() const
{
  return qscriptvalue_cast<Workstation*>(thisObject());
}

void WorkstationPrototype::addScreen(const QString &title)
{
  Workstation* workstation = getWorkstation();
  workstation->addScreen(title);
}


unsigned int WorkstationPrototype::numberOfScreens() const
{
  Workstation* workstation = getWorkstation();
  return workstation->getNScreens();
}

QScriptValue WorkstationPrototype::lastScreen()
{
  Workstation* workstation = getWorkstation();
  unsigned int nScreens = workstation->getNScreens();
  return engine()->toScriptValue(workstation->getScreen(nScreens - 1));
}

void WorkstationPrototype::run()
{
  Workstation* workstation = getWorkstation();
  workstation->run();
}
