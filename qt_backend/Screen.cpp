#include "Screen.h"

#include <QLineEdit>
#include <QLabel>
#include <QPushButton>

Screen::Screen(QWidget* parent, const QString& title) 
  : QWidget(parent)
{
}

QWidget* Screen::addLabel(const QString& title) 
{
  QLabel* label = new QLabel(title, this);
  return label;
}

QWidget* Screen::addTextEdit(const QString& defaultText) 
{
  QLineEdit* lineEdit = new QLineEdit(defaultText, this);
  return lineEdit;
}

QWidget* Screen::addButton(const QString& buttonText)
{
  QPushButton* pushButton = new QPushButton(buttonText, this); 
  return pushButton;
}
