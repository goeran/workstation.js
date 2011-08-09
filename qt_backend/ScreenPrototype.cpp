#include "ScreenPrototype.h"
#include "Screen.h"

#include <QtScript/QScriptValue>
#include <QtScript/QScriptEngine>

Q_DECLARE_METATYPE(Screen*)

ScreenPrototype::ScreenPrototype(QObject *parent)
: QObject(parent)
{
}

ScreenPrototype::~ScreenPrototype()
{
}

QScriptValue ScreenPrototype::addWidget(const QString& type)
{
  Screen *item = qscriptvalue_cast<Screen*>(thisObject());
  QWidget* widget = 0;
  if (type == QString("label")) {
    widget = item->addLabel();
  }
  else if (type == QString("textbox")) {
    widget = item->addTextEdit();
  }
  else if (type == QString("button")) {
    widget = item->addButton();
  }
  else {
    qDebug("Unknown widget: %s", type.toStdString().c_str());
    return QScriptValue();
  }

  return engine()->toScriptValue(widget);
}
