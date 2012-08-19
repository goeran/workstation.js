#ifndef WORKSTATIONPROTOTYPE_H
#define WORKSTATIONPROTOTYPE_H

#include <QtCore/QObject>
#include <QtCore/QVariantMap>
#include <QtScript/QScriptable>
#include <QtScript/QScriptValue>

class Workstation;

class WorkstationPrototype : public QObject, public QScriptable
{
  Q_OBJECT
 public:
  WorkstationPrototype(QObject *parent = 0);
  ~WorkstationPrototype();

 public slots:
  void addScreen(const QString& text);
  unsigned int numberOfScreens() const;
  QScriptValue lastScreen();
  void run();

 private:
  Workstation* getWorkstation() const;
};

#endif
