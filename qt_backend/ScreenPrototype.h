#ifndef SCREENPROTOTYPE_H
#define SCREENPROTOTYPE_H

#include <QtCore/QObject>
#include <QtScript/QScriptable>
#include <QtScript/QScriptValue>

class ScreenPrototype : public QObject, public QScriptable
{
  Q_OBJECT
 public:
  ScreenPrototype(QObject *parent = 0);
  ~ScreenPrototype();

  public slots:
  QScriptValue addWidget(const QString& type);

};

#endif
