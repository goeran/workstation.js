#ifndef SCREEN_H
#define SCREEN_H

#include <QWidget>

class Screen : public QWidget
{
  Q_OBJECT

 public:
  Screen(QWidget* parent, const QString& title);
  ~Screen() {};
  
  QWidget* addLabel();
  QWidget* addTextEdit();
  QWidget* addButton();
};

#endif

