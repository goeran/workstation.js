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

void WorkstationPrototype::addScreen(const QString &title)
{
  Workstation* item = qscriptvalue_cast<Workstation*>(thisObject());
  item->addScreen(title);
}


unsigned int WorkstationPrototype::numberOfScreens() const
{
  Workstation *item = qscriptvalue_cast<Workstation*>(thisObject());
  return item->getNScreens();
}

QScriptValue WorkstationPrototype::lastScreen()
{
  Workstation *item = qscriptvalue_cast<Workstation*>(thisObject());
  unsigned int nScreens = item->getNScreens();
  return engine()->toScriptValue(item->getScreen(nScreens - 1));
}

void WorkstationPrototype::run()
{
  Workstation *item = qscriptvalue_cast<Workstation*>(thisObject());
  item->run();
}
