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

void ScreenPrototype::addWidget(const QString& type,
                                const QString& text, 
                                const QVariantMap& values)
{
  Screen *item = qscriptvalue_cast<Screen*>(thisObject());
  if (type == QString("label")) {
    item->addLabel(text);
  }
  else if (type == QString("textbox")) {
    item->addTextEdit(text);
  }
  else if (type == QString("button")) {
    item->addButton(text);
  }
  else {
    qDebug("Unknown widget: %s", type.toStdString().c_str());
  }
}
