#ifndef WORKSTATION_H
#define WORKSTATION_H

#include <QWidget>
#include <QVector>

class Screen;

class Workstation : public QWidget
{
  Q_OBJECT
 public:
  Workstation(QWidget* parent = 0);
  ~Workstation() {};

  void addScreen(const QString& title);
  Screen* getScreen(unsigned int index);
  unsigned int getNScreens() const;

 private:
  QVector<Screen*> screens;
  
};

#endif

