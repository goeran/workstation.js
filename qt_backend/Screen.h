#ifndef SCREEN_H
#define SCREEN_H

#include <QWidget>

class Screen : public QWidget
{
  Q_OBJECT

 public:
  Screen(QWidget* parent, const QString& title);
  ~Screen() {};
  
  void addLabel(const QString& title);
  void addTextEdit(const QString& defaultText);
  void addButton(const QString& buttonText);
};

#endif

