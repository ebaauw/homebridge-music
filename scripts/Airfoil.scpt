FasdUAS 1.101.10   ��   ��    k             l     ��  ��    3 - homebridge-music/scripts/Airfoil.applescript     � 	 	 Z   h o m e b r i d g e - m u s i c / s c r i p t s / A i r f o i l . a p p l e s c r i p t   
  
 l     ��  ��    = 7 Copyright � 2016-2019 Erik Baauw. All rights reserved.     �   n   C o p y r i g h t   �   2 0 1 6 - 2 0 1 9   E r i k   B a a u w .   A l l   r i g h t s   r e s e r v e d .      l     ��������  ��  ��        l     ��  ��    : 4 Homebridge plugin for iTunes with Airplay speakers.     �   h   H o m e b r i d g e   p l u g i n   f o r   i T u n e s   w i t h   A i r p l a y   s p e a k e r s .      l     ��������  ��  ��        l     ��  ��      Player: iTunes     �      P l a y e r :   i T u n e s      l     ��   ��    B < Speakers: Airfoil, see: https://www.rogueamoeba.com/airfoil      � ! ! x   S p e a k e r s :   A i r f o i l ,   s e e :   h t t p s : / / w w w . r o g u e a m o e b a . c o m / a i r f o i l   " # " l     ��������  ��  ��   #  $ % $ i      & ' & I      �������� 0 getstate getState��  ��   ' k     : ( (  ) * ) r      + , + I     �������� $0 getspeakerstates getSpeakerStates��  ��   , o      ���� 0 sp   *  -�� - O    : . / . k    9 0 0  1 2 1 Z    ! 3 4�� 5 3 =    6 7 6 1    ��
�� 
pPlS 7 m    ��
�� ePlSkPSP 4 r     8 9 8 n     : ; : 1    ��
�� 
pnam ; 1    ��
�� 
pTrk 9 o      ���� 0 t  ��   5 r    ! < = < m     > > � ? ?   = o      ���� 0 t   2  @�� @ e   " 9 A A b   " 9 B C B b   " 7 D E D b   " 5 F G F b   " 3 H I H b   " 1 J K J b   " / L M L b   " + N O N b   " ) P Q P m   " # R R � S S  { " o n " : Q l  # ( T���� T =  # ( U V U 1   # &��
�� 
pPlS V m   & '��
�� ePlSkPSP��  ��   O m   ) * W W � X X  , " v o l u m e " : M 1   + .��
�� 
pVol K m   / 0 Y Y � Z Z  , " t r a c k " : " I o   1 2���� 0 t   G m   3 4 [ [ � \ \  " , " s p e a k e r s " : E o   5 6���� 0 sp   C m   7 8 ] ] � ^ ^  }��   / m    	 _ _p                                                                                  hook  alis      mbpr                           BD ����
iTunes.app                                                     ����            ����  
 cu             Applications  /:Applications:iTunes.app/   
 i T u n e s . a p p  
  m b p r  Applications/iTunes.app   / ��  ��   %  ` a ` l     ��������  ��  ��   a  b c b i     d e d I      �� f���� 0 setplayeron setPlayerOn f  g h g o      ���� 0 o   h  i�� i o      ���� 0 t  ��  ��   e O     O j k j k    N l l  m n m Z    * o p�� q o o    ���� 0 o   p k    " r r  s t s O    u v u I    �� w����  0 setaudiosource setAudioSource w  x�� x m     y y � z z  i T u n e s��  ��   v  f    	 t  { | { I   �� }��
�� .hookPlaynull��� ��� obj  } 4    �� ~
�� 
cTrk ~ o    ���� 0 t  ��   |  ��  r    " � � � m    ��
�� boovfals � 1    !��
�� 
pMut��  ��   q I  % *������
�� .hookStopnull��� ��� null��  ��   n  � � � Z   + @ � ��� � � =  + 0 � � � 1   + .��
�� 
pPlS � m   . /��
�� ePlSkPSP � r   3 : � � � n   3 8 � � � 1   6 8��
�� 
pnam � 1   3 6��
�� 
pTrk � o      ���� 0 t  ��   � k   = @ � �  � � � l  = =�� � ���   � %  tell me to setAllSpeakersOff()    � � � � >   t e l l   m e   t o   s e t A l l S p e a k e r s O f f ( ) �  ��� � r   = @ � � � m   = > � � � � �   � o      ���� 0 t  ��   �  ��� � e   A N � � b   A N � � � b   A L � � � b   A J � � � b   A H � � � m   A B � � � � �  { " o n " : � l  B G ����� � =  B G � � � 1   B E��
�� 
pPlS � m   E F��
�� ePlSkPSP��  ��   � m   H I � � � � �  , " t r a c k " : " � o   J K���� 0 t   � m   L M � � � � �  " }��   k m      � �p                                                                                  hook  alis      mbpr                           BD ����
iTunes.app                                                     ����            ����  
 cu             Applications  /:Applications:iTunes.app/   
 i T u n e s . a p p  
  m b p r  Applications/iTunes.app   / ��   c  � � � l     ��������  ��  ��   �  � � � i     � � � I      �� ����� 0 changetrack changeTrack �  ��� � o      ���� 0 n  ��  ��   � O     F � � � k    E � �  � � � Z    ! � ����� � =   	 � � � 1    ��
�� 
pPlS � m    ��
�� ePlSkPSP � Z     � ��� � � o    ���� 0 n   � I   ������
�� .hookNextnull��� ��� null��  ��  ��   � I   ������
�� .hookPrevnull��� ��� null��  ��  ��  ��   �  � � � Z   " 7 � ��� � � =  " ' � � � 1   " %��
�� 
pPlS � m   % &��
�� ePlSkPSP � r   * 1 � � � n   * / � � � 1   - /��
�� 
pnam � 1   * -��
�� 
pTrk � o      ���� 0 t  ��   � k   4 7 � �  � � � l  4 4�� � ���   � %  tell me to setAllSpeakersOff()    � � � � >   t e l l   m e   t o   s e t A l l S p e a k e r s O f f ( ) �  ��� � r   4 7 � � � m   4 5 � � � � �   � o      ���� 0 t  ��   �  ��� � e   8 E � � b   8 E � � � b   8 C � � � b   8 A � � � b   8 ? � � � m   8 9 � � � � �  { " o n " : � l  9 > ����� � =  9 > � � � 1   9 <��
�� 
pPlS � m   < =��
�� ePlSkPSP��  ��   � m   ? @ � � � � �  , " t r a c k " : " � o   A B���� 0 t   � m   C D � � � � �  " }��   � m      � �p                                                                                  hook  alis      mbpr                           BD ����
iTunes.app                                                     ����            ����  
 cu             Applications  /:Applications:iTunes.app/   
 i T u n e s . a p p  
  m b p r  Applications/iTunes.app   / ��   �  � � � l     ��������  ��  ��   �  � � � i     � � � I      �� ����� "0 setplayervolume setPlayerVolume �  ��� � o      ���� 0 v  ��  ��   � O      � � � k     � �  � � � r    	 � � � o    ���� 0 v   � 1    ��
�� 
pVol �  ��� � e   
  � � b   
  � � � b   
  � � � m   
  � � �    { " v o l u m e " : � 1    ��
�� 
pVol � m     �  }��   � m     p                                                                                  hook  alis      mbpr                           BD ����
iTunes.app                                                     ����            ����  
 cu             Applications  /:Applications:iTunes.app/   
 i T u n e s . a p p  
  m b p r  Applications/iTunes.app   / ��   �  l     ��������  ��  ��    i    	 I      ��
���� 0 setspeakeron setSpeakerOn
  o      ���� 0 sp   �� o      �� 0 o  ��  ��  	 O     4 k    3  r     6    4   �~
�~ 
AFSp m    �}�}  =  	  1   
 �|
�| 
pnam o    �{�{ 0 sp   o      �z�z 0 s    Z    +�y o    �x�x 0 o   k    #  !  I   �w"�v
�w .RAAFConnnull���     ****" o    �u�u 0 s  �v  ! #�t# I   #�s$�r
�s .sysodelanull��� ��� nmbr$ m    %% @       �r  �t  �y   I  & +�q&�p
�q .RAAFDiscnull���     ****& o   & '�o�o 0 s  �p   '�n' e   , 3(( b   , 3)*) b   , 1+,+ m   , --- �..  { " o n " :, n   - 0/0/ 1   . 0�m
�m 
Conn0 o   - .�l�l 0 s  * m   1 211 �22  }�n   m     33�                                                                                  RAss  alis    (  mbpr                           BD ����Airfoil.app                                                    ����            ����  
 cu             	Utilities   %/:Applications:Utilities:Airfoil.app/     A i r f o i l . a p p  
  m b p r  "Applications/Utilities/Airfoil.app  / ��   454 l     �k�j�i�k  �j  �i  5 676 i    898 I      �h:�g�h $0 setspeakervolume setSpeakerVolume: ;<; o      �f�f 0 sp  < =�e= o      �d�d 0 v  �e  �g  9 O     (>?> k    '@@ ABA r    CDC 6   EFE 4   �cG
�c 
AFSpG m    �b�b F =  	 HIH 1   
 �a
�a 
pnamI o    �`�` 0 sp  D o      �_�_ 0 s  B JKJ r    LML ^    NON o    �^�^ 0 v  O m    �]�] dM l     P�\�[P n      QRQ 1    �Z
�Z 
Vol R o    �Y�Y 0 s  �\  �[  K S�XS e    'TT b    'UVU b    %WXW m    YY �ZZ  { " v o l u m e " :X l   $[�W�V[ c    $\]\ ]    "^_^ l    `�U�T` n     aba 1     �S
�S 
Vol b o    �R�R 0 s  �U  �T  _ m     !�Q�Q d] m   " #�P
�P 
long�W  �V  V m   % &cc �dd  }�X  ? m     ee�                                                                                  RAss  alis    (  mbpr                           BD ����Airfoil.app                                                    ����            ����  
 cu             	Utilities   %/:Applications:Utilities:Airfoil.app/     A i r f o i l . a p p  
  m b p r  "Applications/Utilities/Airfoil.app  / ��  7 fgf l     �O�N�M�O  �N  �M  g hih i    jkj I      �L�K�J�L $0 getspeakerstates getSpeakerStates�K  �J  k k     Kll mnm r     opo m     qq �rr  ,p 1    �I
�I 
txdln s�Hs O    Ktut k   
 Jvv wxw r   
 yzy J   
 �G�G  z o      �F�F 0 sp  x {|{ X    @}�E~} s   ! ;� b   ! 8��� b   ! 6��� b   ! .��� b   ! ,��� b   ! (��� b   ! &��� m   ! "�� ���  "� n   " %��� 1   # %�D
�D 
pnam� o   " #�C�C 0 s  � m   & '�� ���  " : { " o n " :� n   ( +��� 1   ) +�B
�B 
Conn� o   ( )�A�A 0 s  � m   , -�� ���  , " v o l u m e " :� l  . 5��@�?� c   . 5��� ]   . 3��� l  . 1��>�=� n   . 1��� 1   / 1�<
�< 
Vol � o   . /�;�; 0 s  �>  �=  � m   1 2�:�: d� m   3 4�9
�9 
long�@  �?  � m   6 7�� ���  }� n      ���  ;   9 :� o   8 9�8�8 0 sp  �E 0 s  ~ l   ��7�6� 2    �5
�5 
AFSp�7  �6  | ��4� e   A J�� b   A J��� b   A F��� m   A D�� ���  {� o   D E�3�3 0 sp  � m   F I�� ���  }�4  u m    ���                                                                                  RAss  alis    (  mbpr                           BD ����Airfoil.app                                                    ����            ����  
 cu             	Utilities   %/:Applications:Utilities:Airfoil.app/     A i r f o i l . a p p  
  m b p r  "Applications/Utilities/Airfoil.app  / ��  �H  i ��� l     �2�1�0�2  �1  �0  � ��� i    ��� I      �/��.�/  0 setaudiosource setAudioSource� ��-� o      �,�, 0 a  �-  �.  � k     5�� ��� r     ��� l    
��+�*� n     
��� 1    
�)
�) 
psxp� l    ��(�'� I    �&��%
�& .earsffdralis        afdr� 4     �$�
�$ 
capp� o    �#�# 0 a  �%  �(  �'  �+  �*  � o      �"�" 0 p  � ��!� O    5��� Z    4��� �� >   ��� n    ��� 1    �
� 
pnam� 1    �
� 
CurA� o    �� 0 a  � k    0�� ��� r    $��� I   "���
� .corecrel****      � null�  � ���
� 
kocl� m    �
� 
AAud�  � o      �� 0 s  � ��� r   % *��� o   % &�� 0 p  � n      ��� 1   ' )�
� 
AFil� o   & '�� 0 s  � ��� r   + 0��� o   + ,�� 0 s  � 1   , /�
� 
CurA�  �   �  � m    ���                                                                                  RAss  alis    (  mbpr                           BD ����Airfoil.app                                                    ����            ����  
 cu             	Utilities   %/:Applications:Utilities:Airfoil.app/     A i r f o i l . a p p  
  m b p r  "Applications/Utilities/Airfoil.app  / ��  �!  � ��� l     ����  �  �  � ��� l     ����  �   on setAllSpeakersOff()   � ��� .   o n   s e t A l l S p e a k e r s O f f ( )� ��� l     ����  � C = 	tell application "Airfoil" to disconnect from every speaker   � ��� z   	 t e l l   a p p l i c a t i o n   " A i r f o i l "   t o   d i s c o n n e c t   f r o m   e v e r y   s p e a k e r� ��� l     �
���
  �   end setAllSpeakersOff   � ��� ,   e n d   s e t A l l S p e a k e r s O f f� ��	� l     ����  �  �  �	       
�����������  � ����� ������� 0 getstate getState� 0 setplayeron setPlayerOn� 0 changetrack changeTrack� "0 setplayervolume setPlayerVolume�  0 setspeakeron setSpeakerOn�� $0 setspeakervolume setSpeakerVolume�� $0 getspeakerstates getSpeakerStates��  0 setaudiosource setAudioSource� �� '���������� 0 getstate getState��  ��  � ������ 0 sp  �� 0 t  � �� _�������� > R W�� Y [ ]�� $0 getspeakerstates getSpeakerStates
�� 
pPlS
�� ePlSkPSP
�� 
pTrk
�� 
pnam
�� 
pVol�� ;*j+  E�O� /*�,�  *�,�,E�Y �E�O�*�,� %�%*�,%�%�%�%�%�%U� �� e���������� 0 setplayeron setPlayerOn�� ����� �  ������ 0 o  �� 0 t  ��  � ������ 0 o  �� 0 t  �  � y������������������ � � � ���  0 setaudiosource setAudioSource
�� 
cTrk
�� .hookPlaynull��� ��� obj 
�� 
pMut
�� .hookStopnull��� ��� null
�� 
pPlS
�� ePlSkPSP
�� 
pTrk
�� 
pnam�� P� L� ) *�k+ UO*�/j Of*�,FY *j O*�,�  *�,�,E�Y �E�O�*�,� %�%�%�%U� �� ����������� 0 changetrack changeTrack�� ����� �  ���� 0 n  ��  � ������ 0 n  �� 0 t  �  ������������� � � � �
�� 
pPlS
�� ePlSkPSP
�� .hookNextnull��� ��� null
�� .hookPrevnull��� ��� null
�� 
pTrk
�� 
pnam�� G� C*�,�  � 
*j Y *j Y hO*�,�  *�,�,E�Y �E�O�*�,� %�%�%�%U� �� ������ ���� "0 setplayervolume setPlayerVolume�� ����   ���� 0 v  ��  � ���� 0 v    �� �
�� 
pVol�� � �*�,FO�*�,%�%U� ��	�������� 0 setspeakeron setSpeakerOn�� ����   ������ 0 sp  �� 0 o  ��   �������� 0 sp  �� 0 o  �� 0 s   3������%����-��1
�� 
AFSp  
�� 
pnam
�� .RAAFConnnull���     ****
�� .sysodelanull��� ��� nmbr
�� .RAAFDiscnull���     ****
�� 
Conn�� 5� 1*�k/�[�,\Z�81E�O� �j O�j Y �j O��,%�%U� ��9�������� $0 setspeakervolume setSpeakerVolume�� ����   ������ 0 sp  �� 0 v  ��   �������� 0 sp  �� 0 v  �� 0 s   	e��������Y��c
�� 
AFSp
�� 
pnam�� d
�� 
Vol 
�� 
long�� )� %*�k/�[�,\Z�81E�O��!��,FO��,� �&%�%U� ��k����	
���� $0 getspeakerstates getSpeakerStates��  ��  	 ������ 0 sp  �� 0 s  
 q���������������������������
�� 
txdl
�� 
AFSp
�� 
kocl
�� 
cobj
�� .corecnte****       ****
�� 
pnam
�� 
Conn
�� 
Vol �� d
�� 
long�� L�*�,FO� BjvE�O 0*�-[��l kh ��,%�%��,%�%��,� �&%�%�6G[OY��Oa �%a %U� �����������  0 setaudiosource setAudioSource�� ����   ���� 0 a  ��   �������� 0 a  �� 0 p  �� 0 s   
�������������������
�� 
capp
�� .earsffdralis        afdr
�� 
psxp
�� 
CurA
�� 
pnam
�� 
kocl
�� 
AAud
�� .corecrel****      � null
�� 
AFil�� 6*�/j �,E�O� %*�,�,� *��l E�O���,FO�*�,FY hU ascr  ��ޭ