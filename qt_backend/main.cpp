#include <QtGui>
#include <QtScript>

#include "Workstation.h"
#include "WorkstationPrototype.h"
#include "Screen.h"
#include "ScreenPrototype.h"

Q_DECLARE_METATYPE(Workstation*)
Q_DECLARE_METATYPE(Screen*)

// Constructor for QPoint (used to move the widget)
QScriptValue QPoint_ctor(QScriptContext *context, QScriptEngine *engine)
{
  int x = context->argument(0).toInt32();
  int y = context->argument(1).toInt32();
  return engine->toScriptValue(QPoint(x, y));
}


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
  
  // Make the constructor for QPoint accessible from the script.
  // See http://doc.trolltech.com/4.5/qtscript.html#implementing-constructors-for-value-based-types
  engine.globalObject().setProperty("QPoint", engine.newFunction(QPoint_ctor));

  // Add a workstation object to the script engine's global object
  Workstation workstation;
  engine.globalObject().setProperty("workstationQt", 
				    engine.newQObject(&workstation));


  QStringList files;
  files << "../lib/workstation.js"
	<< "./workstation_qt.js" 
	<< "./playground.js";

  foreach (const QString& fileName, files) {
    qDebug() << fileName;
    QFile file(fileName);
    file.open(QIODevice::ReadOnly);
    QScriptValue result = engine.evaluate(file.readAll());
    file.close();
    if (engine.hasUncaughtException()) {
      int lineNo = engine.uncaughtExceptionLineNumber();
      qWarning() << "Error in file: " << fileName << " Line" << lineNo << ":" << result.toString();
    }
  }

  workstation.run();
  workstation.show();
  return application.exec();
}
