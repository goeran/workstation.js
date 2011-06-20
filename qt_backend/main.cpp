#include <QtGui>
#include <QtScript>

#include "Workstation.h"
#include "WorkstationPrototype.h"
#include "Screen.h"
#include "ScreenPrototype.h"

Q_DECLARE_METATYPE(Workstation*)
Q_DECLARE_METATYPE(Screen*)

int main(int argc, char **argv) 
{
  QApplication application(argc, argv);
  QScriptEngine engine;

  // Add the two prototypes which we need to access from javascript: 
  // workstation and screen
  WorkstationPrototype workstationProto;
  engine.setDefaultPrototype(qMetaTypeId<Workstation*>(),
			     engine.newQObject(&workstationProto));

  ScreenPrototype screenProto;
  engine.setDefaultPrototype(qMetaTypeId<Screen*>(),
			     engine.newQObject(&screenProto));

  // Add a workstation object to the script engine's global object
  Workstation workstation;
  engine.globalObject().setProperty("workstation", 
				    engine.newQObject(&workstation));

  QFile file("./playground.js");
  file.open(QIODevice::ReadOnly);
  QScriptValue result = engine.evaluate(file.readAll());
  file.close();
  if (engine.hasUncaughtException()) {
    int lineNo = engine.uncaughtExceptionLineNumber();
    qWarning() << "Line" << lineNo << ":" << result.toString();
  }

  workstation.show();
  return application.exec();
}