#ifndef SCREEN_H
#define SCREEN_H

#include <QWidget>

class Screen : public QWidget
{
  Q_OBJECT

 public:
  Screen(QWidget* parent, const QString& title);
  ~Screen() {};
  
  QWidget* addLabel(const QString& title);
  QWidget* addTextEdit(const QString& defaultText);
  QWidget* addButton(const QString& buttonText);
};

#endif

